namespace Zed31rus.Apps.Authorization.Core.Base;

public interface IBasePermission
{
    public string Name { get; }
}

public abstract class BasePermission: IBasePermission
{
    public abstract string Name { get; }
}