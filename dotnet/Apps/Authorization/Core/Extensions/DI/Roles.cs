using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Apps.Authorization.Core.Base;
using zed31rus.Packages.Libs.Reflection;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class RolesDiExtension
{
    public static IServiceCollection AddRoles(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var roleTypes = AttributeReflection.GetWhereAttribute<Attributes.RoleAttribute>(assembly);

        foreach (var type in roleTypes)
        {
            var primaryInterface = InterfaceReflection.ResolvePrimaryInterface(type);
            var attr = type.GetCustomAttribute<Attributes.RoleAttribute>()!;
            container.Add(new ServiceDescriptor(type, type, attr.Lifetime));
            container.Add(new ServiceDescriptor(primaryInterface, sp => sp.GetRequiredService(type), attr.Lifetime));
            container.Add(new ServiceDescriptor(typeof(BaseRole), sp => sp.GetRequiredService(type), attr.Lifetime));
        }

        return container;
    }
}