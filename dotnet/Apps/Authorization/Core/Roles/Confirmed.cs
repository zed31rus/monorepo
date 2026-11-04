using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Base;
using Zed31rus.Apps.Authorization.Core.Permissions;

namespace Zed31rus.Apps.Authorization.Core.Roles;

public interface IConfirmedRole: IBaseRole
{
    public new string Name => "confirmed";
}

[Role]
internal class ConfirmedRole(DefaultUserRole defaultUserRole, GetUsersPermission getUsersPermission): BaseRole, IConfirmedRole
{
    public override string Name => "confirmed";
    public override BaseRole? ParentRole => defaultUserRole;

    public override BasePermission[] Permissions =>
    [
        getUsersPermission
    ];
}