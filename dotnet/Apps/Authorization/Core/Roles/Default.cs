using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Roles;

public interface IDefaultUserRole
{
    public string Name => "user";
    public BaseRole? ParentRole => null;

    public BasePermission[] Permissions { get; }
}

[Role]
internal class DefaultUserRole(): BaseRole, IDefaultUserRole
{
    public override string Name => "user";
    public override BaseRole? ParentRole => null;

    public override BasePermission[] Permissions { get; } =
    [
    ];
}