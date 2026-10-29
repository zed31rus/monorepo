using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Apps.Authorization.Core.Handlers;
using zed31rus.Packages.Libs.Proxies;
using zed31rus.Packages.Libs.Reflection;
using zed31rus.Shared.Base;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class ServiceDiExtension
{
    public static IServiceCollection AddServices(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var serviceTypes = AttributeReflection.GetWhereAttribute<Attributes.ServiceAttribute>(assembly);
        foreach (var type in serviceTypes)
        {
            var primaryInterface = InterfaceReflection.ResolvePrimaryInterface(type);
            var attr = type.GetCustomAttribute<Attributes.ServiceAttribute>()!;
            var proxyType = typeof(ErrorHandlerProxy<>).MakeGenericType(primaryInterface);
            var createMethod = proxyType.GetMethod("Create", [primaryInterface, typeof(IExceptionHandlerBase)])!;
            container.Add(new ServiceDescriptor(type, type, attr.Lifetime));
            container.Add(new ServiceDescriptor(primaryInterface,
                sp =>
                {
                    var inner = sp.GetRequiredService(type);
                    var handler = sp.GetRequiredService<IExceptionHandler>();
                    return createMethod.Invoke(null, [inner, handler])!;

                }, attr.Lifetime));
        }

        return container;
    }
}