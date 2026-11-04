using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Auth.Options;
using Zed31rus.Packages.Db.Auth;
using Zed31rus.Packages.Libs.DI.Extensions;

namespace Zed31rus.Apps.Authorization.Core.Extensions.DI;

public static class CoreExternalUseDiExtension
{
    public static IServiceCollection AddAuthCore(this IServiceCollection container)
    {
        container.AddArgon2();
        container.AddSha256();
        container.AddHex();
        container.AddJwt();

        container.AddAuthDb(sp => sp.GetRequiredService<IConnectionOption>().Database);

        container.AddPermissions();
        container.AddRoles();
        container.AddHandlers();
        container.AddManagers();
        container.AddServices();

        return container;
    }
}