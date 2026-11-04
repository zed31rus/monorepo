using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Apps.Authorization.Core.Base;
using Zed31rus.Packages.Libs.Reflection;

namespace Zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class PermissionsDiExtension
{
    public static IServiceCollection AddPermissions(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var permissionTypes = AttributeReflection.GetWhereAttribute<Attributes.PermissionAttribute>(assembly);

        foreach (var type in permissionTypes)
        {
            var primaryInterface = InterfaceReflection.ResolvePrimaryInterface(type);
            var attr = type.GetCustomAttribute<Attributes.PermissionAttribute>()!;
            container.Add(new ServiceDescriptor(type, type, attr.Lifetime));
            container.Add(new ServiceDescriptor(primaryInterface, sp => sp.GetRequiredService(type), attr.Lifetime));
            container.Add(new ServiceDescriptor(typeof(BasePermission), sp => sp.GetRequiredService(type), attr.Lifetime));
        }

        return container;
    }
}