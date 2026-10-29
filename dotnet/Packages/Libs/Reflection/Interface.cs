using Microsoft.Extensions.DependencyInjection;

namespace zed31rus.Packages.Libs.Reflection;

public class InterfaceReflection
{
    public static Type ResolvePrimaryInterface(Type type)
    {
        var allInterfaces = type.GetInterfaces();
        var interfaces = allInterfaces
            .Where(i => !allInterfaces.Any(other => other != i && i.IsAssignableFrom(other))).ToArray();

        if (interfaces.Length == 1)
        {
            return interfaces[0];
        }
        else
        {
            throw new InvalidOperationException(
                $"{type.Name} Failed to resolve primary interface");
        }
    } 
}