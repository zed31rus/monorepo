using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Permissions;

public interface IGetUsersPermission: IBasePermission
{
    public new string Name => "get-users";
}

[Permission]
internal class GetUsersPermission: BasePermission, IGetUsersPermission
{
    public override string Name => "get-users";
}