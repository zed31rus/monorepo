using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Packages.Libs.Reflection;

namespace Zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class HandlerDiExtension
{
    public static IServiceCollection AddHandlers(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();
        
        var handlerTypes = AttributeReflection.GetWhereAttribute<Attributes.HandlerAttribute>(assembly);

        foreach (var type in handlerTypes)
        {
            var primaryInterface = type.ResolvePrimaryInterface();
            var attr = type.GetCustomAttribute<Attributes.HandlerAttribute>()!;
            container.Add(new ServiceDescriptor(primaryInterface, type, attr.Lifetime));
        }

        return container;
    }
}