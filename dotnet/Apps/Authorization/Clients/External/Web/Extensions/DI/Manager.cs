using System.Reflection;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Extensions.DI;

internal static class ManagerOptionDiExtension
{
    public static IServiceCollection AddManagers(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var managerTypes = assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                type.GetCustomAttribute<Clients.Web.External.Attributes.Manager>() is not null);

        foreach (var type in managerTypes)
        {
            var interfaces = type.GetInterfaces();

            if (interfaces.Length == 1)
            {
                var interfaceType = interfaces[0];
                var attr = type.GetCustomAttribute<Clients.Web.External.Attributes.Manager>()!;
                container.Add(new ServiceDescriptor(interfaceType, type, attr.Lifetime));
            }
            else if (interfaces.Length == 0)
            {
                var attr = type.GetCustomAttribute<Clients.Web.External.Attributes.Manager>()!;
                container.Add(new ServiceDescriptor(type, type, attr.Lifetime));
            }
            else
            {
                throw new InvalidOperationException(
                    $"{type.Name} [Manager] realized more then one interface");
            }
        }

        return container;
    }
}