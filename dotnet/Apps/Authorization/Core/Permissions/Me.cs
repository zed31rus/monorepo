using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Base;

namespace Zed31rus.Apps.Authorization.Core.Permissions;

public interface IMePermission: IBasePermission
{
    public new string Name => "me";
}

[Permission]
internal class MePermission: BasePermission, IMePermission
{
    public override string Name => "me";
}