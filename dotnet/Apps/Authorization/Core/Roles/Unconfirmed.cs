using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;
using zed31rus.Apps.Authorization.Core.Permissions;

namespace zed31rus.Apps.Authorization.Core.Roles;

public interface IUnconfirmedRole: IBaseRole
{
    public new string Name => "unconfirmed";
}

[Role]
internal class UnconfirmedRole(ConfirmationPermission confirmationPermission, MePermission mePermission): BaseRole, IUnconfirmedRole
{
    public override string Name => "unconfirmed";
    public override BaseRole? ParentRole => null;

    public override BasePermission[] Permissions =>
    [
        confirmationPermission,
        mePermission
    ];
}