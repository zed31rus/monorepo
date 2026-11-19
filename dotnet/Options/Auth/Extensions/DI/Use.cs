using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Shared.Extensions.DI;

namespace Zed31rus.Options.Auth.Extensions.DI;

public static class UseDiExtension
{
    public static IServiceCollection AddAuthOptions(this IServiceCollection container, string? env)
    {
        var assembly = Assembly.GetExecutingAssembly();
        
        return container.SharedSafeAddOption(assembly, env);
    }
}