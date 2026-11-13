using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Shared.Constants;
using Zed31rus.Options.Shared.Extensions.DI;

namespace Zed31rus.Options.Auth.Extensions.DI;

public static class UseDiExtension
{
    public static IServiceCollection AddAuthOptions(this IServiceCollection container, string? env)
    {
        return container.SharedSafeAddOption(env);
    }
}