using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Packages.Infra.Discord;

namespace Zed31rus.Packages.Infra.Extensions.DI;

public static class UseDiExtension
{
    public static IServiceCollection AddInfra(this IServiceCollection container)
    {
        container.AddHttpClient<IDiscordOauth, DiscordOauth>();
        container.AddHttpClient<IDiscordUsers, DiscordUsers>();

        return container;
    }
}