using Microsoft.EntityFrameworkCore;
using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Exceptions;
using Zed31rus.Packages.Db.Auth;
using Zed31rus.Packages.Db.Auth.Dto.User;
using Zed31rus.Packages.Db.Auth.Models;

namespace Zed31rus.Apps.Authorization.Core.Services;

public interface IMeService
{
    public Task<PersonalUser> Get(Guid uuid, CancellationToken ct = default);
    public Task<PersonalUser> UpdateNickname(string newNickName, Guid uuid, CancellationToken ct = default);
    public Task<PersonalUser> UpdateEmailFind(bool allowEmailFind, Guid uuid, CancellationToken ct = default);
    public Task<PersonalUser> UpdateLoginFind(bool allowLoginFind, Guid uuid, CancellationToken ct = default);
}

[Service]
internal class MeService(IAuthDbContext db): IMeService
{
    public async Task<PersonalUser> Get(Guid uuid, CancellationToken ct = default)
    {
        var rawUser = await db.Users.SingleOrDefaultAsync(user => user.Uuid == uuid, ct);
        if (rawUser is null) throw new CoreBusinessExceptions.UserNotFoundException();
        return rawUser.ToPersonalUser();
    }

    public async Task<PersonalUser> UpdateNickname(string newNickName, Guid uuid, CancellationToken ct = default)
    {
        var rawUser = await db.Users.SingleOrDefaultAsync(user => user.Uuid == uuid, ct);
        if (rawUser is null) throw new CoreBusinessExceptions.UserNotFoundException();
        rawUser.Nickname = newNickName;
        await db.SaveChangesAsync(ct);

        return rawUser.ToPersonalUser();
    }

    public async Task<PersonalUser> UpdateEmailFind(bool allowEmailFind, Guid uuid, CancellationToken ct = default)
    {
        var rawUser = await db.Users.SingleOrDefaultAsync(user => user.Uuid == uuid, ct);
        if (rawUser is null) throw new CoreBusinessExceptions.UserNotFoundException();
        rawUser.AllowEmailFind = allowEmailFind;
        await db.SaveChangesAsync(ct);

        return rawUser.ToPersonalUser();
    }

    public async Task<PersonalUser> UpdateLoginFind(bool allowLoginFind, Guid uuid, CancellationToken ct = default)
    {
        var rawUser = await db.Users.SingleOrDefaultAsync(user => user.Uuid == uuid, ct);
        if (rawUser is null) throw new CoreBusinessExceptions.UserNotFoundException();
        rawUser.AllowLoginFind = allowLoginFind;

        await db.SaveChangesAsync(ct);

        return rawUser.ToPersonalUser();
    }
}