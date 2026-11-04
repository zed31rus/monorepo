using Microsoft.EntityFrameworkCore;
using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Exceptions;
using Zed31rus.Packages.Db.Auth;
using Zed31rus.Packages.Db.Auth.Dto.User;
using Zed31rus.Packages.Db.Auth.Models;

namespace Zed31rus.Apps.Authorization.Core.Services;

public interface IUsersService
{
    public Task<PublicUser> GetByUuid(Guid uuid, CancellationToken ct = default);
    public Task<PublicUser> GetByEmail(string email, CancellationToken ct = default);
    public Task<PublicUser> GetByLogin(string login, CancellationToken ct = default);
    public Task<PublicUser> GetByNickname(string nickName, CancellationToken ct = default);
}

[Service]
internal class UsersService(IAuthDbContext db): IUsersService
{
    public async Task<PublicUser> GetByUuid(Guid uuid, CancellationToken ct = default)
    {
        var rawUser = await db.Users.SingleOrDefaultAsync(user => user.Uuid == uuid, ct);
        if (rawUser is null) throw new CoreBusinessExceptions.NotFoundException();
        return rawUser.ToPublicUser();
    }

    public async Task<PublicUser> GetByEmail(string email, CancellationToken ct = default)
    {
        var rawUser = await db.Users.FirstOrDefaultAsync(user => user.Email == email, ct);
        if (rawUser is null || !rawUser.AllowEmailFind )
        {
            throw new CoreBusinessExceptions.NotFoundException();
        }
        return rawUser.ToPublicUser();
    }

    public async Task<PublicUser> GetByLogin(string login, CancellationToken ct = default)
    {
        var rawUser = await db.Users.FirstOrDefaultAsync(user => user.Login == login, ct);
        if (rawUser is null || !rawUser.AllowLoginFind)
        {
            throw new CoreBusinessExceptions.NotFoundException();
        }
        return rawUser.ToPublicUser();
    }

    public async Task<PublicUser> GetByNickname(string nickName, CancellationToken ct = default)
    {
        var rawUser = await db.Users.FirstOrDefaultAsync(user => user.Nickname == nickName, ct);
        if (rawUser is null) throw new CoreBusinessExceptions.NotFoundException();
        return rawUser.ToPublicUser();
    }
}