using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.Reflection;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class HandlerDiExtension
{
    public static IServiceCollection AddHandlers(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var handlerTypes = AttributeReflection.GetWhereAttribute<Attributes.HandlerAttribute>(assembly);

        foreach (var type in handlerTypes)
        {
            var primaryInterface = InterfaceReflection.ResolvePrimaryInterface(type);
            var attr = type.GetCustomAttribute<Attributes.HandlerAttribute>()!;
            container.Add(new ServiceDescriptor(primaryInterface, type, attr.Lifetime));
        }

        return container;
    }
}