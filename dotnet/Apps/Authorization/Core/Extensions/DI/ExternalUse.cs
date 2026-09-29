using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

public static class ExternalUse
{
    public static IServiceCollection AddCore(this IServiceCollection container)
    {
        container.AddArgon2();
        container.AddHex();
    }
}