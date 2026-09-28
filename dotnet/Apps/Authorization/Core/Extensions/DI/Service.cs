using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class Service
{
    public static IServiceCollection AddServices(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var serviceTypes = assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                type.GetCustomAttribute<Attributes.Service>() is not null);

        foreach (var type in serviceTypes)
        {
            var interfaces = type.GetInterfaces();

            if (interfaces.Length == 1)
            {
                var interfaceType = interfaces[0];
                var attr = type.GetCustomAttribute<Attributes.Service>()!;
                container.Add(new ServiceDescriptor(interfaceType, type, attr.Lifetime));
            }
            else if (interfaces.Length == 0)
            {
                var attr = type.GetCustomAttribute<Attributes.Service>()!;
                container.Add(new ServiceDescriptor(type, type, attr.Lifetime));
            }
            else
            {
                throw new InvalidOperationException(
                    $"{type.Name} [Service] realized more then one interface");
            }
        }

        return container;
    }
}