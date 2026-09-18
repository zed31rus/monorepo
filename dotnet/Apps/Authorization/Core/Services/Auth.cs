using zed31rus.Packages.Db;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Core.Services;

public class Auth
{
    private IAuthDbContext db;

    internal Auth(IAuthDbContext db)
    {
        this.db = db;
    }

    internal void Register(string login, string password, string email, string passsword, string locale)
    {
        
        IUser user = new User{ Login = login, Email = email, Locale = locale};
    }
}