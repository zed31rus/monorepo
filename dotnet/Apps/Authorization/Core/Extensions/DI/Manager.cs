using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class ManagerDiExtension
{
    public static IServiceCollection AddManagers(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var managerTypes = assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                type.GetCustomAttribute<Attributes.ManagerAttribute>() is not null);

        foreach (var type in managerTypes)
        {
            var allInterfaces = type.GetInterfaces();
            var interfaces = allInterfaces
                .Where(i => !allInterfaces.Any(other => other != i && i.IsAssignableFrom(other))).ToArray();
            
            if (interfaces.Length == 1)
            {
                var interfaceType = interfaces[0];
                var attr = type.GetCustomAttribute<Attributes.ManagerAttribute>()!;
                container.Add(new ServiceDescriptor(interfaceType, type, attr.Lifetime));
            }
            else
            {
                throw new InvalidOperationException(
                    $"{type.Name} [Manager] realized not only one interface");
            }
        }

        return container;
    }
}