namespace zed31rus.Apps.Authorization.Core.Base;

public abstract class BaseRole
{
    public abstract string Name { get; }
    public abstract BaseRole? ParentRole { get; }
    public abstract BasePermission[] Permissions { get; }
}