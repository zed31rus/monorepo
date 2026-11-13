using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Packages.Libs.Reflection;

namespace Zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class ManagerDiExtension
{
    public static IServiceCollection AddManagers(this IServiceCollection container)
    {
        var managerTypes = AttributeReflection.GetWhereAttribute<Attributes.ManagerAttribute>();

        foreach (var type in managerTypes)
        {
            var primaryInterface = InterfaceReflection.ResolvePrimaryInterface(type);
            var attr = type.GetCustomAttribute<Attributes.ManagerAttribute>()!;
            container.Add(new ServiceDescriptor(primaryInterface, type, attr.Lifetime));
        }

        return container;
    }
}