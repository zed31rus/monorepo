using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Auth.Options;
using Zed31rus.Options.Auth.Values;

namespace Zed31rus.Options.Auth.Extensions.DI;

public static class UseDiExtension
{
    public static IServiceCollection AddAppOptions(this IServiceCollection services)
    {
        services.AddSingleton<IJwtOption>(OptionValues.Jwt);
        services.AddSingleton<ISessionOption>(OptionValues.Session);
        services.AddSingleton<IAuthOption>(OptionValues.Auth);
        services.AddSingleton<IConnectionOption>(OptionValues.Connection);

        return services;
    }
}