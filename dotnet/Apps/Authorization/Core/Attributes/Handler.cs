using Microsoft.Extensions.DependencyInjection;

namespace Zed31rus.Apps.Authorization.Core.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
internal class HandlerAttribute(ServiceLifetime lifetime = ServiceLifetime.Scoped) : Attribute
{
    public ServiceLifetime Lifetime { get; } = lifetime;
}