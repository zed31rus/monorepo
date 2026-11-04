using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Base;

namespace Zed31rus.Apps.Authorization.Core.Roles;

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