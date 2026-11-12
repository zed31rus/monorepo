using Microsoft.Extensions.DependencyInjection;

namespace Zed31rus.Options.Auth.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
internal class ValueAttribute(ServiceLifetime lifetime = ServiceLifetime.Singleton) : Attribute
{
    public ServiceLifetime Lifetime { get; } = lifetime;
}