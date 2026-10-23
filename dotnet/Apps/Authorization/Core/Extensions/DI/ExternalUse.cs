using Microsoft.Extensions.DependencyInjection;
using zed31rus.Options.Options;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

public static class CoreExternalUseDiExtension
{
    public static IServiceCollection AddAuthCore(this IServiceCollection container)
    {
        container.AddArgon2();
        container.AddSha256();
        container.AddHex();
        container.AddJwt();

        container.AddAuthDb(sp => sp.GetRequiredService<IConnectionOption>().Database);

        container.AddHandlers();
        container.AddManagers();
        container.AddServices();

        return container;
    }
}