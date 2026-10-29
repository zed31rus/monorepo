using Microsoft.EntityFrameworkCore;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Exceptions;
using zed31rus.Apps.Authorization.Core.Managers;
using zed31rus.Apps.Authorization.Core.Roles;
using zed31rus.Options.Options;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;
using zed31rus.Packages.Libs.Hash;

namespace zed31rus.Apps.Authorization.Core.Services;

public interface IAuthService
{
    Task<PublicUser> Register(
        string login,
        string nickname,
        string password,
        string email,
        string locale,
        CancellationToken ct = default);

    Task<AuthServiceLoginReturn> Login(
        string login,
        string password,
        CancellationToken ct = default);

    Task<AuthServiceRefreshReturn> Refresh(
        string incomingRefreshToken,
        CancellationToken ct = default);

    Task Logout(
        string incomingRefreshToken,
        CancellationToken ct = default);
}

public record AuthServiceLoginReturn(PersonalUser User, CoreSessionManagerSessionReturn CoreSessionManagerSession);

public record AuthServiceRefreshReturn(PersonalUser User, CoreSessionManagerSessionReturn CoreSessionManagerSession);

[Service]
internal class AuthService(
    ICoreSessionManager sessionManager,
    IArgon2 argon,
    ISha256 sha256,
    IAuthDbContext db,
    IAuthOption authOptions,
    UnconfirmedRole unconfirmedRole
    )
    : IAuthService
{
    public async Task<PublicUser> Register(string login, string nickname, string password, string email,
        string locale,
        CancellationToken ct = default)
    {
        var passwordHash = await argon.CreateAsync(password);
        var rawUser = new User { Login = login, Nickname = nickname, Email = email, Role = unconfirmedRole.Name, PasswordHash = passwordHash, Locale = locale };
        db.Users.Add(rawUser);
        await db.SaveChangesAsync(ct);
        return rawUser.ToPublicUser();
    }

    public async Task<AuthServiceLoginReturn> Login(string login, string password, CancellationToken ct = default)
    {
        var rawUser = await db.Users.SingleAsync(user => user.Login == login, ct);

        var passwordHash = rawUser?.PasswordHash ?? authOptions.DummyPasswordHash;
        var isPasswordCorrect = await argon.CompareAsync(password, passwordHash);

        if (rawUser is null || !isPasswordCorrect) throw new CoreBusinessErrors.InvalidCredentialsException();
        
        var session = await sessionManager.CreateSession(rawUser);
        await db.SaveChangesAsync(ct);

        return new AuthServiceLoginReturn(rawUser.ToPersonalUser(), session);
    }

    public async Task<AuthServiceRefreshReturn> Refresh(string incomingRefreshToken, CancellationToken ct = default)
    {
        var hashedIncomingToken = await sha256.CreateAsync(incomingRefreshToken);
        var incomingRefreshTokenRecord = await db.RefreshTokens.Include(token => token.User)
            .FirstOrDefaultAsync(token => token.HashedToken == hashedIncomingToken, ct);
        if (incomingRefreshTokenRecord is null) throw new CoreBusinessErrors.InvalidCredentialsException();

        var expired = DateTime.UtcNow > incomingRefreshTokenRecord.ExpiresAt;

        if (expired) throw new CoreBusinessErrors.InvalidCredentialsException();

        db.RefreshTokens.Remove(incomingRefreshTokenRecord);

        var rawUser = incomingRefreshTokenRecord.User;
        var session = await sessionManager.CreateSession(rawUser);

        await db.SaveChangesAsync(ct);

        return new AuthServiceRefreshReturn(rawUser.ToPersonalUser(), session);
    }

    public async Task Logout(string incomingRefreshToken, CancellationToken ct = default)
    {
        var hashedIncomingToken = await sha256.CreateAsync(incomingRefreshToken);
        var incomingRefreshTokenRecord =
            await db.RefreshTokens.FirstOrDefaultAsync(token => token.HashedToken == hashedIncomingToken, ct);
        if (incomingRefreshTokenRecord is null) throw new CoreBusinessErrors.InvalidCredentialsException();
        db.RefreshTokens.Remove(incomingRefreshTokenRecord);
        await db.SaveChangesAsync(ct);
    }
}