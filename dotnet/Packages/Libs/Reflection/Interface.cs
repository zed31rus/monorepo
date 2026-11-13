using Microsoft.Extensions.DependencyInjection;

namespace Zed31rus.Packages.Libs.Reflection;

public static class InterfaceReflection
{
    public static Type ResolvePrimaryInterface(this Type type)
    {
        if (type.IsInterface)
            return type;

        var allInterfaces = type.GetInterfaces();
        var interfaces = allInterfaces
            .Where(i => !allInterfaces.Any(other => other != i && i.IsAssignableFrom(other))).ToArray();

        if (interfaces.Length == 1)
        {
            return interfaces[0];
        }

        throw new InvalidOperationException(
            $"{type.Name} Failed to resolve primary interface");
    }
}