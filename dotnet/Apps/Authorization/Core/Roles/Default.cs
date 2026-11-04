using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Base;
using Zed31rus.Apps.Authorization.Core.Permissions;

namespace Zed31rus.Apps.Authorization.Core.Roles;

public interface IDefaultUserRole: IBaseRole
{
    public new string Name => "user";
}

[Role]
internal class DefaultUserRole(MePermission mePermission): BaseRole, IDefaultUserRole
{
    public override string Name => "user";
    public override BaseRole? ParentRole => null;

    public override BasePermission[] Permissions { get; } =
    [
        mePermission
    ];
}