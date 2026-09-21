using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Models;
using zed31rus.Packages.Libs;
using zed31rus.Packages.Libs.Hash;
using zed31rus.Packages.Libs.Tokens;

namespace zed31rus.Apps.Authorization.Core.Managers;

public class Session(IJwt jwt, IHex hex, ISha256 hash, IAuthDbContext db)
{
    private async createSession(User user)
    {
        var refreshTokenExpires = hex.GetExpires();
        var refreshToken = hex.Create();
        var refreshTokenHashed = hash.CreateAsync(refreshToken);

        var refreshTokenRecord = new RefreshToken();

        db.RefreshTokens.Add();
    }
}