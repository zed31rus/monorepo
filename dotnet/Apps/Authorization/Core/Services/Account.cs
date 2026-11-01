using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Core.Services;

interface IAccountService
{
    public Task<PersonalUser> EmailVerificationSend(Guid uuid, CancellationToken ct = default);
}

[Service]
internal class AccountService: IAccountService
{
    public async Task<PersonalUser> EmailVerificationSend(Guid uuid, CancellationToken ct = default)
    {
        throw new NotImplementedException();
    }
}