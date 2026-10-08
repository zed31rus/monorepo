using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Core.Services;

[Service]
internal class Account
{
    public async Task<PersonalUser> emailVerificationSend(Guid uuid, CancellationToken ct)
    {
        throw new InvalidOperationException();
    }
}