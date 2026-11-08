using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Dto.User;

namespace Zed31rus.Apps.Authorization.Core.Services;

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

    public async Task<PersonalUser> ChangeEmailRequest(Guid uuid, CancellationToken ct = default)
    {
        throw new NotImplementedException();
    }

    public async Task<PersonalUser> ChangeEmailConfirm(Guid uuid, CancellationToken ct = default)
    {
        throw new NotImplementedException();
    }

    public async Task<PersonalUser> ChangePasswordRequest(Guid uuid, CancellationToken ct = default)
    {
        throw new NotImplementedException();
    }
}