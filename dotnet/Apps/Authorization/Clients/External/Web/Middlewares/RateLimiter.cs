using System.Threading.RateLimiting;
using zed31rus.Apps.Authorization.Core.Extensions.Getters;
using zed31rus.Packages.Db.Auth.Dto.User;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class RateLimiterMiddleware
{
    public static IServiceCollection AddRateLimiters(this IServiceCollection container)
    {
        
        container.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.AddPolicy("per-ip", PerIpRateLimitPartition);
            options.AddPolicy("per-user", PerUserRateLimitPartition);
            options.AddPolicy("default", DefaultRateLimitPartition);
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
        var xForwardedIp = context.Request.Headers["x-forwarded-for"].FirstOrDefault()?.Split(", ")[0];
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