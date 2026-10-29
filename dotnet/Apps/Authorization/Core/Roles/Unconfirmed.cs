using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;
using zed31rus.Apps.Authorization.Core.Permissions;

namespace zed31rus.Apps.Authorization.Core.Roles;

public interface IUnconfirmedRole
{
    public string Name => "unconfirmed";
    public BaseRole? ParentRole => null;
    public BasePermission[] Permissions { get; }
}

[Role]
internal class UnconfirmedRole(ConfirmationPermission confirmationPermission): BaseRole, IUnconfirmedRole
{
    public override string Name => "unconfirmed";
    public override BaseRole? ParentRole => null;

    public override BasePermission[] Permissions =>
    [
        confirmationPermission
    ];
}