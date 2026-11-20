namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Me;

public class MeRoutes
{
    public const string Group = "/me";

    public readonly record struct Endpoint(string Path, string Name);

    public static class Endpoints
    {
        public static readonly Endpoint Get = new("/get", "Me.Get");
        public static readonly Endpoint UpdateNickname = new("/update/nickname", "Me.Update.Nickname");
        public static readonly Endpoint UpdateEmailFind = new("/update/find/email", "Me.Update.Find.Email");
        public static readonly Endpoint UpdateLoginFind = new("/update/find/login", "Me.Update.Find.Login");
    }
}