namespace Zed31rus.Apps.Authorization.Core.Base;

public interface IBaseRole
{
    public abstract string Name { get; }
    public abstract BaseRole? ParentRole { get; }
    public abstract BasePermission[] Permissions { get; }
}

public abstract class BaseRole: IBaseRole
{
    public abstract string Name { get; }
    public abstract BaseRole? ParentRole { get; }
    public abstract BasePermission[] Permissions { get; }
}