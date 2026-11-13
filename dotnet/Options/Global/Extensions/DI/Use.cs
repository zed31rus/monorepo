using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Shared.Extensions.DI;

namespace Zed31rus.Options.Global.Extensions.DI;

public static class UseDiExtension
{
    public static IServiceCollection AddGlobalOptions(this IServiceCollection container, string env)
    {
        return container.SharedSafeAddOption(env);
    }
}