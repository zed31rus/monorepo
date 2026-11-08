using Microsoft.AspNetCore.Cors.Infrastructure;
using Zed31rus.Options.Global.Options;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

public static class CorsAppMiddleware
{
    public class PolicyNames
    {
        public const string Main = "main";
        public const string Dev = "dev";
    }
    
    public static IServiceCollection AddMainCorsPolicy(this IServiceCollection container)
    {
        container.AddOptions<CorsOptions>().Configure<IDomainOption>((options, domainOption) =>
        {
            options.AddPolicy(PolicyNames.Main, policy =>
            {
                policy.WithOrigins($"https://{domainOption.MainDomain}", $"https://*.{domainOption.MainDomain}")
                    .SetIsOriginAllowedToAllowWildcardSubdomains()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return container;
    }

    public static IServiceCollection AddDevCorsPolicy(this IServiceCollection container)
    {
        return container.AddCors(options =>
        {
            options.AddPolicy(PolicyNames.Dev, policy =>
            {
                policy.SetIsOriginAllowed(origin => 
                    {
                        var uri = new Uri(origin);
                        return uri.Host == "localhost" || uri.Host == "127.0.0.1";
                    })
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });
    }
}