namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Auth;

public class AuthRoutes
{
    public const string Group = "/auth";

    public readonly record struct Endpoint(string Path, string Name);

    public static class Endpoints
    {
        public static readonly Endpoint Register = new("/register", "Auth.Register");
        public static readonly Endpoint Login = new("/login", "Auth.Login");
        public static readonly Endpoint Refresh = new("/refresh", "Auth.Refresh");
        public static readonly Endpoint Logout = new("/logout", "Auth.Logout");
    }
}