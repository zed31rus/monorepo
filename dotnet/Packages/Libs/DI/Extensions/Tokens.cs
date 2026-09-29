using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.Tokens;

namespace zed31rus.Packages.Libs.DI.Extensions;

public static class Tokens
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