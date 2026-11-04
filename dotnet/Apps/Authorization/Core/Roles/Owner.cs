using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Base;

namespace Zed31rus.Apps.Authorization.Core.Roles;

public interface IOwner: IBaseRole
{
    public new string Name => "owner";
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