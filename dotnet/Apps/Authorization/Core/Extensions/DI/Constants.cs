using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Apps.Authorization.Core.Constants;

namespace Zed31rus.Apps.Authorization.Core.Extensions.DI;

public static class ConstantsDIExtension
{
    public static IServiceCollection AddOauthConstants(this IServiceCollection container)
    {
        container.AddSingleton<OauthConstants>();

        return container;
    } 
}