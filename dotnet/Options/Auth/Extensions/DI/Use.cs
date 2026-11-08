using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Auth.Options;
using Zed31rus.Options.Auth.Values;

namespace Zed31rus.Options.Auth.Extensions.DI;

public static class UseDiExtension
{
    public static IServiceCollection AddAppOptions(this IServiceCollection services)
    {
        services.AddSingleton<IJwtOption>(DevValues.Jwt);
        services.AddSingleton<ISessionOption>(DevValues.Session);
        services.AddSingleton<IAuthOption>(DevValues.Auth);
        services.AddSingleton<IConnectionOption>(DevValues.Connection);

        return services;
    }
}