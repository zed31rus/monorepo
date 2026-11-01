using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;
using zed31rus.Apps.Authorization.Core.Permissions;

namespace zed31rus.Apps.Authorization.Core.Roles;

public interface IConfirmedRole: IBaseRole
{
    public new string Name => "confirmed";
}

[Role]
internal class ConfirmedRole(GetUsersPermission getUsersPermission): BaseRole, IConfirmedRole
{
    public override string Name => "confirmed";
    public override BaseRole? ParentRole => null;

    public override BasePermission[] Permissions =>
    [
        getUsersPermission
    ];
}