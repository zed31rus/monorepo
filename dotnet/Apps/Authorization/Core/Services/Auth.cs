using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;
using zed31rus.Packages.Libs.Hash;

namespace zed31rus.Apps.Authorization.Core.Services;

public interface IAuth
{
    Task<PublicUser> Register(
        string login,
        string nickname,
        string password,
        string email,
        string locale,
        CancellationToken ct = default);

    Task<LoginReturn> Login(
        string login,
        string password,
        CancellationToken ct = default);

    Task<RefreshReturn> Refresh(
        string incomingRefreshToken,
        CancellationToken ct = default);

    Task Logout(
        string incomingRefreshToken,
        CancellationToken ct = default);
}

public record LoginReturn(PersonalUser user, Managers.SessionReturn session);

public record RefreshReturn(PersonalUser user, Managers.SessionReturn session);

[Service]
internal class Auth(
    Managers.ISession sessionManager,
    IArgon2 argon,
    ISha256 sha256,
    IAuthDbContext db,
    IOptions<Options.Auth> authOptions)
    : IAuth
{
    public async Task<PublicUser> Register(string login, string nickname, string password, string email,
        string locale,
        CancellationToken ct = default)
    {
        var passwordHash = await argon.CreateAsync(password);
        var rawUser = new User
            { Login = login, Nickname = nickname, Email = email, PasswordHash = passwordHash, Locale = locale };
        db.Users.Add(rawUser);
        await db.SaveChangesAsync(ct);
        return rawUser.ToPublicUser();
    }

    public async Task<LoginReturn> Login(string login, string password, CancellationToken ct = default)
    {
        var rawUser = await db.Users.FirstOrDefaultAsync(user => user.Login == login, ct);

        var passwordHash = rawUser?.PasswordHash ?? authOptions.Value.DummyPasswordHash;
        var isPasswordCorrect = await argon.CompareAsync(password, passwordHash);

        if (rawUser is null || !isPasswordCorrect) throw new Errors.InvalidCredentialsException();
        
        var session = await sessionManager.CreateSession(rawUser);
        await db.SaveChangesAsync(ct);

        return new LoginReturn(rawUser.ToPersonalUser(), session);
    }

    public async Task<RefreshReturn> Refresh(string incomingRefreshToken, CancellationToken ct = default)
    {
        var hashedIncomingToken = await sha256.CreateAsync(incomingRefreshToken);
        var incomingRefreshTokenRecord = await db.RefreshTokens.Include(token => token.User)
            .FirstOrDefaultAsync(token => token.HashedToken == hashedIncomingToken, ct);
        if (incomingRefreshTokenRecord is null) throw new Errors.InvalidCredentialsException();

        var expired = DateTime.UtcNow > incomingRefreshTokenRecord.ExpiresAt;

        if (expired) throw new Errors.InvalidCredentialsException();

        db.RefreshTokens.Remove(incomingRefreshTokenRecord);

        var rawUser = incomingRefreshTokenRecord.User;
        var session = await sessionManager.CreateSession(rawUser);

        await db.SaveChangesAsync(ct);

        return new RefreshReturn(rawUser.ToPersonalUser(), session);
    }

    public async Task Logout(string incomingRefreshToken, CancellationToken ct = default)
    {
        var hashedIncomingToken = await sha256.CreateAsync(incomingRefreshToken);
        var incomingRefreshTokenRecord =
            await db.RefreshTokens.FirstOrDefaultAsync(token => token.HashedToken == hashedIncomingToken, ct);
        if (incomingRefreshTokenRecord is null) throw new Errors.InvalidCredentialsException();
        db.RefreshTokens.Remove(incomingRefreshTokenRecord);
        await db.SaveChangesAsync(ct);
    }
}