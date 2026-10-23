using System.Threading.RateLimiting;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class RateLimiterMiddleware
{
    public static IServiceCollection AddRateLimiter(this IServiceCollection container)
    {
        
        container.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.AddPolicy("per-ip", context => RateLimitPartition.GetSlidingWindowLimiter(
                ResolveRealIp(context),
                factory => new SlidingWindowRateLimiterOptions
                {
                    PermitLimit = 100,
                    Window = TimeSpan.FromMinutes(15)
                }
            ));
        });

        container.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.AddPolicy("per-user", context => RateLimitPartition.GetSlidingWindowLimiter(
                ResolveUser(context),
                factory => new SlidingWindowRateLimiterOptions
                {
                    PermitLimit = 200,
                    Window = TimeSpan.FromMinutes(5)
                }
            ));
        });

        return container;
    }

    private static string ResolveRealIp(HttpContext context)
    {
        var cfIp = context.Request.Headers["cf-connecting-ip"].FirstOrDefault();
        var xForwardedIp = context.Request.Headers["x-forwarded-for"].FirstOrDefault()?.Split(",")[0];
        var realIp = context.Request.Headers["x-x-real-ip"].FirstOrDefault();
        var remoteIpAddress = context.Connection.RemoteIpAddress?.ToString();

        var ip = cfIp ?? realIp ?? xForwardedIp ?? remoteIpAddress ?? "";
        return ip;
    }

    private static User ResolveUser(HttpContext context)
    {
        throw new NotImplementedException();
    }
}