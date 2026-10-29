using System.Reflection;

namespace zed31rus.Packages.Libs.Reflection;

public static class AttributeReflection
{
    public static IEnumerable<Type> GetWhereAttribute<TAttribute>(Assembly assembly) where TAttribute : Attribute
    {
        return assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                type.GetCustomAttribute<TAttribute>() is not null);
    }
}