using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace zed31rus.Apps.Authorization.Core.DI;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
public class ServiceAttribute : Attribute
{
    public ServiceLifetime Lifetime { get; }

    public ServiceAttribute(ServiceLifetime lifetime = ServiceLifetime.Scoped)
    {
        Lifetime = lifetime;
    }
}