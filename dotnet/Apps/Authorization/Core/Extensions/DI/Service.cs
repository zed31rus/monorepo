using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Apps.Authorization.Core.Handlers;
using zed31rus.Packages.Libs.Proxies;
using zed31rus.Shared.Base;

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
            var allInterfaces = type.GetInterfaces();
            var interfaces = allInterfaces
                .Where(i => !allInterfaces.Any(other => other != i && i.IsAssignableFrom(other))).ToArray();

            if (interfaces.Length == 1)
            {
                var interfaceType = interfaces[0];
                var attr = type.GetCustomAttribute<Attributes.ServiceAttribute>()!;
                var proxyType = typeof(ErrorHandlerProxy<>).MakeGenericType(interfaceType);
                var createMethod = proxyType.GetMethod("Create", [interfaceType, typeof(IExceptionHandlerBase)])!;
                container.Add(new ServiceDescriptor(type, type, attr.Lifetime));
                container.Add(new ServiceDescriptor(interfaceType,
                    sp =>
                    {
                        var inner = sp.GetRequiredService(type);
                        var handler = sp.GetRequiredService<IExceptionHandler>();
                        return createMethod.Invoke(null, [inner, handler])!;

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