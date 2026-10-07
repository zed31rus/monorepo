using Microsoft.EntityFrameworkCore;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Errors;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Core.Services;

public interface IUsers
{
    public Task<PublicUser> GetByUuid(Guid uuid, CancellationToken ct);
    public Task<PublicUser> GetByEmail(string email, CancellationToken ct);
    public Task<PublicUser> GetByLogin(string login, CancellationToken ct);
    public Task<PublicUser> GetByNickname(string nickName, CancellationToken ct);
}

[Service]
internal class Users(IAuthDbContext db): IUsers
{
    public async Task<PublicUser> GetByUuid(Guid uuid, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Uuid == uuid, ct);
        return rawUser.ToPublicUser();
    }

    public async Task<PublicUser> GetByEmail(string email, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Email == email, ct);
        if (!rawUser.AllowEmailFind)
        {
            throw new NotFoundException();
        }
        return rawUser.ToPublicUser();
    }

    public async Task<PublicUser> GetByLogin(string login, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Login == login, ct);
        if (!rawUser.AllowLoginFind)
        {
            throw new NotFoundException();
        }
        return rawUser.ToPublicUser();
    }

    public async Task<PublicUser> GetByNickname(string nickName, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Nickname == nickName, ct);
        return rawUser.ToPublicUser();
    }
}