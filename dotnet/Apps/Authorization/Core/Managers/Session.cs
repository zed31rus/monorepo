using System.Security.Claims;
using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Dto.User;
using Zed31rus.Apps.Authorization.Core.Extensions.Mappers;
using Zed31rus.Packages.Db.Auth;
using Zed31rus.Packages.Db.Auth.Models;
using Zed31rus.Packages.Libs.Hash;
using Zed31rus.Packages.Libs.Tokens;

namespace Zed31rus.Apps.Authorization.Core.Managers;

public record CoreSessionManagerRefreshTokenInfo(
    string Token,
    HexExpires Expires
);

public record CoreSessionManagerJwtTokenInfo(
    string Token,
    JwtExpires Expires);

public record CoreSessionManagerSessionReturn(
    CoreSessionManagerRefreshTokenInfo Refresh,
    CoreSessionManagerJwtTokenInfo Access
);

public interface ICoreSessionManager
{
    Task<CoreSessionManagerSessionReturn> CreateSession(User user);
    CoreSessionManagerJwtTokenInfo CreateJwt(User user);
    Task<CoreSessionManagerRefreshTokenInfo> CreateRefresh(User user);
}

[Manager]
internal class SessionManager(IJwt jwt, IHex hex, ISha256 hash, IAuthDbContext db) : ICoreSessionManager
{
    public async Task<CoreSessionManagerSessionReturn> CreateSession(User user)
    {
        var refreshTokenInfo = await CreateRefresh(user);
        var jwtTokenInfo = CreateJwt(user);

        return new CoreSessionManagerSessionReturn(refreshTokenInfo, jwtTokenInfo);
    }

    public CoreSessionManagerJwtTokenInfo CreateJwt(User user)
    {
        var jwtTokenExpires = jwt.GetExpires();
        var publicUser = user.ToPublicUser();
        Claim[] claims = [
            publicUser.ToClaim()
        ];
        var jwtToken = jwt.Create(claims, jwtTokenExpires.Time);

        return new CoreSessionManagerJwtTokenInfo(jwtToken, jwtTokenExpires);
    }

    public async Task<CoreSessionManagerRefreshTokenInfo> CreateRefresh(User user)
    {
        var refreshTokenExpires = hex.GetExpires();
        var refreshToken = hex.Create();
        var refreshTokenHashed = await hash.CreateAsync(refreshToken);

        var refreshTokenRecord = new RefreshToken
            { HashedToken = refreshTokenHashed, ExpiresAt = refreshTokenExpires.AtTime, UserUuid = user.Uuid };

        db.RefreshTokens.Add(refreshTokenRecord);

        return new CoreSessionManagerRefreshTokenInfo(refreshToken, refreshTokenExpires);
    }
}