using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Roles;

public interface IDefaultUserRole: IBaseRole
{
    public new string Name => "user";
}

[Role]
internal class DefaultUserRole(ConfirmedRole confirmedRole): BaseRole, IDefaultUserRole
{
    public override string Name => "user";
    public override BaseRole ParentRole => confirmedRole;

    public override BasePermission[] Permissions { get; } =
    [
    ];
}