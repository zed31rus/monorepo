using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Extensions.Mappers;
using zed31rus.Options.Options;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;
using zed31rus.Packages.Libs.Hash;
using zed31rus.Packages.Libs.Tokens;

namespace zed31rus.Apps.Authorization.Core.Managers;

public record CoreSessionManagerRefreshTokenInfo(
    string Token,
    HexExpires Expires
);

public record CoreSessionManagerJwtTokenInfo(
    string Token,
    JwtExpires Expires);

public record CoreSessionManagerSessionReturn(
    CoreSessionManagerRefreshTokenInfo CoreSessionManagerRefresh,
    CoreSessionManagerJwtTokenInfo Access
);

public interface ICoreSessionManager
{
    Task<CoreSessionManagerSessionReturn> CreateSession(User user);
    CoreSessionManagerJwtTokenInfo CreateJwt(User user);
    Task<CoreSessionManagerRefreshTokenInfo> CreateRefresh(User user);
}

[Manager]
internal class SessionManager(IJwt jwt, IHex hex, ISha256 hash, IAuthDbContext db, IJwtOption jwtOptions) : ICoreSessionManager
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
        var publicUserClaims = publicUser.ToClaims();
        var jwtToken = jwt.Create(publicUserClaims, jwtTokenExpires.Time);

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