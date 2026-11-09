using Microsoft.EntityFrameworkCore;
using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Constants;
using Zed31rus.Apps.Authorization.Core.Dto.User;
using Zed31rus.Apps.Authorization.Core.Exceptions;
using Zed31rus.Apps.Authorization.Core.Managers;
using Zed31rus.Apps.Authorization.Core.Roles;
using Zed31rus.Packages.Db.Auth;
using Zed31rus.Packages.Db.Auth.Models;
using Zed31rus.Packages.Infra.Discord;
using Zed31rus.Packages.Libs.Encryption;

namespace Zed31rus.Apps.Authorization.Core.Services.Oauth;

public record OauthServiceCallbackReturn(PersonalUser User, CoreSessionManagerSessionReturn Session);

public interface IDiscordOauthService
{
    public Task<OauthServiceCallbackReturn> Callback(string code, PublicUser? publicUser,
        CancellationToken ct = default);
}

[Service]
internal class DiscordOauthService(IAuthDbContext db, ISessionManager sessionManager, IDiscordOauth discordOauth, IDiscordUsers discordUsers, IAes256Gcm encryptor, IConfirmedRole confirmedRole): IDiscordOauthService
{
    public async Task<OauthServiceCallbackReturn> Callback(string code, PublicUser? publicUser, CancellationToken ct = default)
    {
        
    var exchangeReply = await discordOauth.ExchangeCodeAsync(code, ct);
    var discordUser = await discordUsers.MeAsync(exchangeReply.AccessToken, ct);

    var (user, resolveStatus) = await ResolveUser(publicUser, discordUser, ct);

    if (resolveStatus != ResolveUserStatus.New)
    {
        var accounts = await db.OauthAccounts
            .AsNoTracking()
            .Where(oauthAccount => oauthAccount.Provider == OauthConstants.Providers.Discord
                                   && (oauthAccount.ProviderUserId == discordUser.Id || oauthAccount.UserUuid == user.Uuid))
            .ToListAsync(ct);

        var accountByDiscordId = accounts.SingleOrDefault(oauthAccount => oauthAccount.ProviderUserId == discordUser.Id);
        if (accountByDiscordId is not null && accountByDiscordId.UserUuid != user.Uuid)
            throw new CoreBusinessExceptions.Oauth.AccountLinkedToAnotherUserException();

        var accountByUser = accounts.SingleOrDefault(oauthAccount => oauthAccount.UserUuid == user.Uuid);
        if (accountByUser is not null && accountByUser.ProviderUserId != discordUser.Id)
            throw new CoreBusinessExceptions.Oauth.UserHasAnotherAccountException();
    }

    var encryptedRefreshToken = encryptor.Encrypt(exchangeReply.RefreshToken);
    var now = DateTime.UtcNow;

    await db.OauthAccounts.Upsert(new OauthAccount
        {
            Provider = OauthConstants.Providers.Discord,
            ProviderUserId = discordUser.Id,
            UserUuid = user.Uuid,
            EncryptedRefreshToken = encryptedRefreshToken,
            Scope = exchangeReply.Scope,
        })
        .On(oauthAccount => new { oauthAccount.Provider, oauthAccount.ProviderUserId })
        .WhenMatched(oauthAccount => new OauthAccount
        {
            Provider = oauthAccount.Provider,
            ProviderUserId = oauthAccount.ProviderUserId,
            UserUuid = oauthAccount.UserUuid,
            EncryptedRefreshToken = encryptedRefreshToken,
            Scope = exchangeReply.Scope,
            UpdatedAt = now,
        })
        .RunAsync(ct);
    
    

    var session = await sessionManager.CreateSession(user);
    var newPersonalUser = user.ToPersonalUser();

    return new OauthServiceCallbackReturn(newPersonalUser, session);
    }

    private record ResolveUserResult(User User, ResolveUserStatus ResolveStatus);

    private async Task<ResolveUserResult> ResolveUser(PublicUser? publicUser, DiscordUser discordUser, CancellationToken ct = default)
    {
        if (publicUser is not null)
        {
            var user = await db.Users.SingleOrDefaultAsync(recordUser => recordUser.Uuid == publicUser.Uuid, ct);
            if (user is null) throw new CoreBusinessExceptions.UserNotFoundException();
            return new ResolveUserResult(user, ResolveUserStatus.PublicUser);
        }

        var existingOauth = await db.OauthAccounts.Include(oauthAccount => oauthAccount.User).SingleOrDefaultAsync(oauthAccount =>
            oauthAccount.Provider == OauthConstants.Providers.Discord && oauthAccount.ProviderUserId == discordUser.Id, cancellationToken: ct);
        if (existingOauth is not null)
        {
            var user = existingOauth.User;
            return new ResolveUserResult(user, ResolveUserStatus.Oauth);
        }
        if (discordUser.Email is null) throw new CoreBusinessExceptions.Oauth.EmailMissingException();
        if (discordUser.Verified is not true) throw new CoreBusinessExceptions.Oauth.EmailNotVerifiedException();

        var email = discordUser.Email.ToLowerInvariant();

        var existingEmail = await db.Users.SingleOrDefaultAsync(user => user.Email == email, cancellationToken: ct);
        if (existingEmail is not null)
        {
            if (!existingEmail.EmailConfirmed) throw new CoreBusinessExceptions.Oauth.EmailNotVerifiedException();
            return new ResolveUserResult(existingEmail, ResolveUserStatus.Email);
        }

        if (await db.Users.AnyAsync(user => user.Login == discordUser.Username, ct))
            throw new CoreBusinessExceptions.Oauth.LoginAlreadyExists();
        
        var newUser = new User { Login = discordUser.Username, Nickname = discordUser.GlobalName ?? discordUser.Username, Email = email, Role = confirmedRole.Name, Locale = discordUser.Locale ?? "ru" };
        db.Users.Add(newUser);
        
        await db.SaveChangesAsync(ct);

        return new ResolveUserResult(newUser, ResolveUserStatus.New);
    }

    private enum ResolveUserStatus
    {
        New = 0,
        PublicUser = 1,
        Email = 2,
        Oauth = 3,
    }
}