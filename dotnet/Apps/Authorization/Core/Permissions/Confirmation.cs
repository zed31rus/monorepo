using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Base;

namespace zed31rus.Apps.Authorization.Core.Permissions;

public interface IConfirmationPermission
{
    public string Name => "confirmation";
}

[Permission]
internal class ConfirmationPermission: BasePermission, IConfirmationPermission
{
    public override string Name => "confirmation";
}