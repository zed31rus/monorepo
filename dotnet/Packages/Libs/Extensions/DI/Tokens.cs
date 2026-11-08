using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Packages.Libs.Tokens;

namespace Zed31rus.Packages.Libs.Extensions.DI;

public static class TokensDIExtension
{
    public static IServiceCollection AddHex(this IServiceCollection container)
    {
        container.AddSingleton<IHex, Hex>();

        return container;
    }

    public static IServiceCollection AddJwt(this IServiceCollection container)
    {
        container.AddSingleton<IJwt, Jwt>();

        return container;
    }
}