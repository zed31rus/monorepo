namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;

public sealed class UsersRoutes
{
    public const string Group = "/users";

    public Endpoints Paths { get; init; } = new();

    public sealed record Endpoints(
        string GetByUuid = "/get/uuid",
        string GetByLogin = "/get/login",
        string GetByEmail = "/get/email",
        string GetByNickName = "/get/nickname");
}