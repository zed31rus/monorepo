using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Packages.Libs.Encryption;
using Zed31rus.Packages.Libs.Hash;

namespace Zed31rus.Packages.Libs.Extensions.DI;

public static class EncryptionDIExtension
{
    public static IServiceCollection AddAes256Gcm(this IServiceCollection container)
    {
        container.AddSingleton<IAes256Gcm, Aes256Gcm>();

        return container;
    }
}