using Microsoft.EntityFrameworkCore;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Core.Services;

public interface IMe
{
    public Task<PersonalUser> Get(Guid uuid, CancellationToken ct);
    public Task<PersonalUser> UpdateNickname(string newNickName, Guid uuid, CancellationToken ct);
    public Task<PersonalUser> UpdateEmailFind(bool allowEmailFind, Guid uuid, CancellationToken ct);
    public Task<PersonalUser> UpdateLoginFind(bool allowLoginFind, Guid uuid, CancellationToken ct);
}

[Service]
internal class Me(IAuthDbContext db): IMe
{
    public async Task<PersonalUser> Get(Guid uuid, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Uuid == uuid, ct);
        return rawUser.ToPersonalUser();
    }

    public async Task<PersonalUser> UpdateNickname(string newNickName, Guid uuid, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Uuid == uuid, ct);
        rawUser.Nickname = newNickName;
        await db.SaveChangesAsync(ct);

        return rawUser.ToPersonalUser();
    }

    public async Task<PersonalUser> UpdateEmailFind(bool allowEmailFind, Guid uuid, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Uuid == uuid, ct);
        rawUser.AllowEmailFind = allowEmailFind;
        await db.SaveChangesAsync(ct);

        return rawUser.ToPersonalUser();
    }

    public async Task<PersonalUser> UpdateLoginFind(bool allowLoginFind, Guid uuid, CancellationToken ct)
    {
        var rawUser = await db.Users.FirstAsync(user => user.Uuid == uuid, ct);
        rawUser.AllowLoginFind = allowLoginFind;

        await db.SaveChangesAsync(ct);

        return rawUser.ToPersonalUser();
    }
}