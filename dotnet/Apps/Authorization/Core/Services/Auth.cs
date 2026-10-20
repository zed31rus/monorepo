using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Exceptions;
using zed31rus.Apps.Authorization.Core.Managers;
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
    ICoreSessionManager sessionManagerManager,
    IArgon2 argon,
    ISha256 sha256,
    IAuthDbContext db,
    IOptions<Options.AuthOption> authOptions,
    ILogger<AuthService> logger)
    : IAuthService
{
    public async Task<PublicUser> Register(string login, string nickname, string password, string email,
        string locale,
        CancellationToken ct = default)
    {
        var passwordHash = await argon.CreateAsync(password);
        logger.LogInformation("Password for ({Login}) was hashed", login);
        var rawUser = new User
            { Login = login, Nickname = nickname, Email = email, PasswordHash = passwordHash, Locale = locale };
        logger.LogInformation("User ({Uuid}: {Login}) was created", rawUser.Uuid, rawUser.Login);
        db.Users.Add(rawUser);
        logger.LogInformation("User ({Uuid}: {Login}) was added to DataBase", rawUser.Uuid, rawUser.Login);
        await db.SaveChangesAsync(ct);
        logger.LogInformation("DataBase Changes was saved");
        return rawUser.ToPublicUser();
    }

    public async Task<AuthServiceLoginReturn> Login(string login, string password, CancellationToken ct = default)
    {
        var rawUser = await db.Users.FirstOrDefaultAsync(user => user.Login == login, ct);

        var passwordHash = rawUser?.PasswordHash ?? authOptions.Value.DummyPasswordHash;
        var isPasswordCorrect = await argon.CompareAsync(password, passwordHash);

        if (rawUser is null || !isPasswordCorrect) throw new CoreBusinessErrors.InvalidCredentialsException();
        
        var session = await sessionManagerManager.CreateSession(rawUser);
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
        var session = await sessionManagerManager.CreateSession(rawUser);

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