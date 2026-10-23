using Microsoft.Extensions.DependencyInjection;
using zed31rus.Options.Options;
using zed31rus.Options.Values;

namespace zed31rus.Options.Extensions.DI;

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