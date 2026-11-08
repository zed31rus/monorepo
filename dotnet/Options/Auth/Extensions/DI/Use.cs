using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Auth.Options;
using Zed31rus.Options.Auth.Values;

namespace Zed31rus.Options.Auth.Extensions.DI;

public static class UseDiExtension
{
    public static IServiceCollection AddAppOptions(this IServiceCollection container)
    {
        container.AddSingleton<IJwtOption>(DevValues.Jwt);
        container.AddSingleton<IRefreshTokenOption>(DevValues.RefreshToken);
        container.AddSingleton<ISessionOption>(DevValues.Session);
        container.AddSingleton<IAuthOption>(DevValues.Auth);
        container.AddSingleton<IConnectionOption>(DevValues.Connection);
        container.AddSingleton<IEncryptionOption>(DevValues.Encryption);

        return container;
    }
}