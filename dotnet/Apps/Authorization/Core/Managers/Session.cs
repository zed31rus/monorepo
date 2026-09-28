using Microsoft.Extensions.Options;
using zed31rus.Apps.Authorization.Core.Extensions;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;
using zed31rus.Packages.Libs;
using zed31rus.Packages.Libs.Hash;
using zed31rus.Packages.Libs.Tokens;

namespace zed31rus.Apps.Authorization.Core.Managers;

public record RefreshTokenInfo(
    string Token,
    HexExpires Expires
);

public record JwtTokenInfo(
    string Token,
    JwtExpires Expires);

public record SessionReturn(
    RefreshTokenInfo Refresh,
    JwtTokenInfo Access
);

public interface ISession
{
    Task<SessionReturn> CreateSession(User user);
    Task<JwtTokenInfo> CreateJwt(User user);
    Task<RefreshTokenInfo> CreateRefresh(User user);
}

internal class Session(IJwt jwt, IHex hex, ISha256 hash, IAuthDbContext db, IOptions<Options.Jwt> jwtOptions) : ISession
{
    public async Task<SessionReturn> CreateSession(User user)
    {
        var refreshTokenInfo = await CreateRefresh(user);
        var jwtTokenInfo = await CreateJwt(user);

        return new SessionReturn(refreshTokenInfo, jwtTokenInfo);
    }

    public async Task<JwtTokenInfo> CreateJwt(User user)
    {
        var jwtTokenExpires = jwt.GetExpires();
        var publicUser = user.ToPublicUser();
        var publicUserClaims = publicUser.ToClaims();
        var jwtToken = jwt.Create(publicUserClaims, jwtTokenExpires.Time,
            jwtOptions.Value.Secret);

        return new JwtTokenInfo(jwtToken, jwtTokenExpires);
    }

    public async Task<RefreshTokenInfo> CreateRefresh(User user)
    {
        var refreshTokenExpires = hex.GetExpires();
        var refreshToken = hex.Create();
        var refreshTokenHashed = await hash.CreateAsync(refreshToken);

        var refreshTokenRecord = new RefreshToken
            { HashedToken = refreshTokenHashed, ExpiresAt = refreshTokenExpires.AtTime, UserUuid = user.Uuid };

        db.RefreshTokens.Add(refreshTokenRecord);

        return new RefreshTokenInfo(refreshToken, refreshTokenExpires);
    }
}