using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Apps.Authorization.Core.Handlers;
using zed31rus.Packages.Libs.Proxies;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

internal static class ServiceDiExtension
{
    public static IServiceCollection AddServices(this IServiceCollection container)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var serviceTypes = assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                type.GetCustomAttribute<Attributes.ServiceAttribute>() is not null);

        foreach (var type in serviceTypes)
        {
            var interfaces = type.GetInterfaces();

            if (interfaces.Length == 1)
            {
                var interfaceType = interfaces[0];
                var attr = type.GetCustomAttribute<Attributes.ServiceAttribute>()!;
                var proxyType = typeof(ErrorHandlerProxy<>).MakeGenericType(interfaceType);
                var createMethod = proxyType.GetMethod("Create", [interfaceType, typeof(Func<Exception, Exception>)])!;
                container.Add(new ServiceDescriptor(type, type, attr.Lifetime));
                container.Add(new ServiceDescriptor(interfaceType,
                    sp =>
                    {
                        var inner = sp.GetRequiredService(type);
                        var handler = sp.GetRequiredService<IErrorHandler>();
                        Func<Exception, Exception> handle = handler.Translate;
                        return createMethod.Invoke(null, [inner, handle])!;

                    }, attr.Lifetime));
            }
            else
            {
                throw new InvalidOperationException(
                    $"{type.Name} [Service] realized not only one interface");
            }
        }

        return container;
    }
}