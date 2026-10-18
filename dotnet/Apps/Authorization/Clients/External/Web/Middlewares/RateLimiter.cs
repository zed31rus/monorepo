using System.Threading.RateLimiting;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class RateLimiterMiddleware
{
    public static IServiceCollection UseLimiter(this IServiceCollection container)
    {
        return container.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.AddPolicy("per-ip", context => RateLimitPartition.GetFixedWindowLimiter(
                ResolveRealIp(context),
                factory => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 100,
                    Window = TimeSpan.FromMinutes(15)
                }
            ));
        });
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
}