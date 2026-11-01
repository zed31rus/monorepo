using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Permissions;

public interface IMePermission: IBasePermission
{
    public new string Name => "me";
}

[Permission]
internal class MePermission: BasePermission, IMePermission
{
    public override string Name => "me";
}