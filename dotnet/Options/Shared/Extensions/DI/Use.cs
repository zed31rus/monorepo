using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Shared.Attributes;
using Zed31rus.Options.Shared.Constants;
using Zed31rus.Packages.Libs.Reflection;

namespace Zed31rus.Options.Shared.Extensions.DI;

public static class SharedUseDIExtension
{
    public static IServiceCollection SharedSafeAddOption(this IServiceCollection container, Assembly assembly, string? env)
    {
        if (env is null || string.IsNullOrWhiteSpace(env)) return container.SharedAddOption(ValueConstants.ValueTypes.Template, assembly);
        if (!Enum.TryParse<ValueConstants.ValueTypes>(env, ignoreCase: false, out var envType))
        {
            throw new ArgumentOutOfRangeException();
        }
        return container.SharedAddOption(envType, assembly);
    }
    
    public static IServiceCollection SharedAddOption(
        this IServiceCollection container,
        ValueConstants.ValueTypes valueType,
        Assembly assembly)
    {

        var fields = assembly
            .GetTypes()
            .SelectMany(type => type.GetFields(
                BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic))
            .Select(field => (Field: field, Attribute: field.GetCustomAttribute<ValueAttribute>()))
            .Where(fieldAttr => fieldAttr.Attribute?.ValueType == valueType);

        foreach (var (field, attr) in fields)
        {
            var primaryInterface = field.FieldType.ResolvePrimaryInterface();
            container.Add(new ServiceDescriptor(
                primaryInterface,
                _ => field.GetValue(null)!,
                attr!.Lifetime));
        }

        return container;
    }
}