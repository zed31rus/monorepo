namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;

public static class UsersRoutes
{
    public const string Group = "/users";

    public static Endpoints Paths = new();

    public record Endpoints(
        string GetByUuid = "/get/uuid",
        string GetByLogin = "/get/login",
        string GetByEmail = "/get/email",
        string GetByNickName = "/get/nickname");
}