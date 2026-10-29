using System.Reflection;
using zed31rus.Apps.Authorization.Clients.External.Web.Attributes;
using zed31rus.Packages.Libs.Reflection;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Extensions.DI;

internal static class ManagerOptionDiExtension
{
    public static IServiceCollection AddManagers(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();
        var managerTypes = AttributeReflection.GetWhereAttribute<ManagerAttribute>(assembly);
        
        foreach (var type in managerTypes)
        {
            var primaryInterface = InterfaceReflection.ResolvePrimaryInterface(type);
            var attr = type.GetCustomAttribute<ManagerAttribute>()!;
            container.Add(new ServiceDescriptor(primaryInterface, type, attr.Lifetime));
        }

        return container;
    }
}