using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Apps.Authorization.Core.Extensions.DI.Options;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

public static class ExternalUse
{
    public static IServiceCollection AddCore(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddAuthOptions(configuration);
        container.AddConnectionOptions(configuration);
        container.AddJwtOptions(configuration);

        container.AddArgon2();
        container.AddSha256();
        container.AddHex();
        container.AddJwt();

        var connection = configuration.GetSection("Connection").Get<Core.Options.Connection>();
        container.AddAuthDb(connection?.Database!);

        container.AddServices();
        container.AddManagers();

        return container;
    }
}