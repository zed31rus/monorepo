using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Permissions;

public interface IGetUsersPermission
{
    public string Name => "get-users";
}

[Permission]
internal class GetUsersPermission: BasePermission, IMePermission
{
    public override string Name => "get-users";
}