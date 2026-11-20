using Zed31rus.Apps.Authorization.Core.Dto.User;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Auth;

public static class AuthDto
{
    public static class Register
    {
        public record Request(string Login, string Nickname, string Password, string Email, string Locale);
        public record Response(PublicUser User);
    }

    public static class Login
    {
        public record Request(string Login, string Password);
        public record Response(PersonalUser User, string AccessToken, DateTime AccessTokenExpiresAt);
    }

    public static class Refresh
    {
        public record Response(PersonalUser User, string AccessToken, DateTime AccessTokenExpiresAt);
    }
}