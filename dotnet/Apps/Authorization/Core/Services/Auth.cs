using Microsoft.EntityFrameworkCore;
using zed31rus.Apps.Authorization.Core.Errors;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;
using zed31rus.Packages.Libs.Hash;

namespace zed31rus.Apps.Authorization.Core.Services;

internal class Auth(IArgon2 hash, IAuthDbContext db)
{
    internal record RegisterReturn(PublicUser user);

    internal async Task<RegisterReturn> Register(string login, string nickname, string password, string email,
        string locale,
        CancellationToken ct = default)
    {
        var passwordHash = await hash.CreateAsync(password);
        var user = new User
            { Login = login, Nickname = nickname, Email = email, PasswordHash = passwordHash, Locale = locale };
        db.Users.Add(user);
        await db.SaveChangesAsync(ct);
        return new RegisterReturn(user.ToPublicUser());
    }

    internal async Task<PersonalUser> Login(string login, string password, CancellationToken ct = default)
    {
        var rawUser = await db.Users.SingleAsync(user => user.Login == login, ct);
        var isPasswordCorrect = await hash.CompareAsync(password, rawUser.PasswordHash!);
        if (!isPasswordCorrect) throw new InvalidCredentialsException();
    }
}