using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Base;

namespace Zed31rus.Apps.Authorization.Core.Permissions;

public interface IConfirmationPermission: IBasePermission
{
    public new string Name => "confirmation";
}

[Permission]
internal class ConfirmationPermission: BasePermission, IConfirmationPermission
{
    public override string Name => "confirmation";
}