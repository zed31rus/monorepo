namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Auth;

public static class AuthDto
{
    public static class Register
    {
        public record Request(string Login, string Nickname, string Password, string Email, string Locale);
    }
}