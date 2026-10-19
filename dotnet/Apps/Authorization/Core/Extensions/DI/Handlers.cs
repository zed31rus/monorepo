using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class HandlerDiExtension
{
    public static IServiceCollection AddHandlers(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var handlerTypes = assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                type.GetCustomAttribute<Attributes.HandlerAttribute>() is not null);

        foreach (var type in handlerTypes)
        {
            var interfaces = type.GetInterfaces();

            if (interfaces.Length == 1)
            {
                var interfaceType = interfaces[0];
                var attr = type.GetCustomAttribute<Attributes.HandlerAttribute>()!;
                container.Add(new ServiceDescriptor(interfaceType, type, attr.Lifetime));
            }
            else
            {
                throw new InvalidOperationException(
                    $"{type.Name} [handler] realized not only one interface");
            }
        }

        return container;
    }
}