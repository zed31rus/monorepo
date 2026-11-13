using System.Reflection;

namespace Zed31rus.Packages.Libs.Reflection;

public static class AttributeReflection
{
    public static IEnumerable<Type> GetWhereAttribute<TAttribute>() where TAttribute : Attribute
    {
        var assembly = Assembly.GetExecutingAssembly();
        
        return assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                type.GetCustomAttribute<TAttribute>() is not null);
    }
}