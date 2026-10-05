namespace zed31rus.Apps.Authorization.Clients.Web.External.Attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
internal class Manager(ServiceLifetime lifetime = ServiceLifetime.Scoped) : Attribute
{
    public ServiceLifetime Lifetime { get; } = lifetime;
}