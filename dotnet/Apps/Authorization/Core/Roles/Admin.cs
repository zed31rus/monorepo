using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Roles;

interface IAdminRole: IBaseRole
{
    public new string Name => "admin";
}

[Role]
internal class AdminRole(ConfirmedRole confirmedRole): BaseRole, IAdminRole
{
    public override string Name => "admin";
    public override BaseRole ParentRole => confirmedRole;

    public override BasePermission[] Permissions { get; } = 
    [
    ];
}