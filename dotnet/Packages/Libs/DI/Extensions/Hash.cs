using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Packages.Libs.Hash;

namespace Zed31rus.Packages.Libs.DI.Extensions;

public static class Hash
{
    public static IServiceCollection AddArgon2(this IServiceCollection container)
    {
        container.AddSingleton<IArgon2, Argon2>();

        return container;
    }

    public static IServiceCollection AddSha256(this IServiceCollection container)
    {
        container.AddSingleton<ISha256, Sha256>();

        return container;
    }
}