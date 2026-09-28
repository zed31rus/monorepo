using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.Hash;

namespace zed31rus.Packages.Libs.DI.Extensions;

public static class Hash
{
    public static IServiceCollection AddArgon2(this IServiceCollection services)
    {
        services.AddSingleton<IArgon2, Argon2>();

        return services;
    }
}