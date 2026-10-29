using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Roles;

public interface IOwner
{
    public string Name => "owner";
    public BaseRole ParentRole { get; }

    public BasePermission[] Permissions { get; }
}

[Role]
internal class Owner(AdminRole adminRole): BaseRole, IOwner
{
    public override string Name => "owner";
    public override BaseRole ParentRole => adminRole;

    public override BasePermission[] Permissions { get; } =
    [
    ];
}