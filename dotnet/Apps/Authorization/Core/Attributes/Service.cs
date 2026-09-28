using Microsoft.Extensions.DependencyInjection;

namespace zed31rus.Apps.Authorization.Core.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
internal class Service(ServiceLifetime lifetime = ServiceLifetime.Scoped) : Attribute
{
    public ServiceLifetime Lifetime { get; } = lifetime;
}