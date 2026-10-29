using Microsoft.Extensions.DependencyInjection;

namespace zed31rus.Apps.Authorization.Core.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
internal class RoleAttribute(ServiceLifetime lifetime = ServiceLifetime.Singleton) : Attribute
{
    public ServiceLifetime Lifetime { get; } = lifetime;
}