using System.Threading.RateLimiting;
using Zed31rus.Apps.Authorization.Core.Dto.User;
using Zed31rus.Apps.Authorization.Core.Extensions.Getters;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class RateLimiterAppMiddleware
{
    public class PolicyNames
    {
        public const string Default = "default";
        public const string PerIp = "per-ip";
        public const string PerUser = "per-user";
    }
    
    public static IServiceCollection AddRateLimiters(this IServiceCollection container)
    {
        
        container.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.AddPolicy(PolicyNames.PerIp, PerIpRateLimitPartition);
            options.AddPolicy(PolicyNames.PerUser, PerUserRateLimitPartition);
            options.AddPolicy(PolicyNames.Default, DefaultRateLimitPartition);
        });

        return container;
    }

    private static RateLimitPartition<string> PerUserRateLimitPartition(HttpContext context)
    {
        return RateLimitPartition.GetSlidingWindowLimiter(
            ResolveUser(context).Uuid.ToString(),
            factory => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = 200,
                SegmentsPerWindow = 5,
                Window = TimeSpan.FromMinutes(5)
            }
        );
    }

    private static RateLimitPartition<string> PerIpRateLimitPartition(HttpContext context)
    {
        return RateLimitPartition.GetSlidingWindowLimiter(
            ResolveRealIp(context),
            factory => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = 100,
                SegmentsPerWindow = 15,
                Window = TimeSpan.FromMinutes(15)
            }
        );
    }
    
    private static RateLimitPartition<string> DefaultRateLimitPartition(HttpContext context)
    {
        if (context.User.Identity?.IsAuthenticated == true)
        {
            return PerUserRateLimitPartition(context);
        }

        return PerIpRateLimitPartition(context);
    }

    private static string ResolveRealIp(HttpContext context)
    {
        var cfIp = context.Request.Headers["cf-connecting-ip"].FirstOrDefault();
        var xForwardedIp = context.Request.Headers["x-forwarded-for"].FirstOrDefault()?.Split(',')[0].Trim();
        var realIp = context.Request.Headers["x-real-ip"].FirstOrDefault();
        var remoteIpAddress = context.Connection.RemoteIpAddress?.ToString();

        var ip = cfIp ?? realIp ?? xForwardedIp ?? remoteIpAddress ?? "";
        return ip;
    }

    private static PublicUser ResolveUser(HttpContext context)
    {
        return context.User.GetPublicUser();
    }
}