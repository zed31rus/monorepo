using zed31rus.Packages.Libs.Tokens;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Managers;

public class Session()
{
    public class Cookie
    {
        public record Options
        {
            public CookieOptions Refresh => new()
            {
                Domain = ".zed31rus.ru",
                HttpOnly = true,
                Path = "/",
                SameSite = SameSiteMode.Lax,
                Secure = true,
                Expires = DateTimeOffset.UtcNow.AddDays();
            };
        }
    }
}