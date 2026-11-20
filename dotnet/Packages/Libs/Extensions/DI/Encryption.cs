using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Packages.Libs.Encryption;
using Zed31rus.Packages.Libs.Hash;

namespace Zed31rus.Packages.Libs.Extensions.DI;

public static class EncryptionDIExtension
{
    public static IServiceCollection AddAes256Gcm(
        this IServiceCollection container,
        Func<IServiceProvider, string> keyFactory)
    {
        container.AddSingleton<IAes256Gcm>(sp => new Aes256Gcm(keyFactory(sp)));
        return container;
    }
}