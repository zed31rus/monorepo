namespace zed31rus.Apps.Authorization.Clients.External.Web.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
internal class ManagerAttribute(ServiceLifetime lifetime = ServiceLifetime.Scoped) : Attribute
{
    public ServiceLifetime Lifetime { get; } = lifetime;
}