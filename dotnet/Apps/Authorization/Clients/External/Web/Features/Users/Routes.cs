namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;

public static class UsersRoutes
{
    public const string Group = "/users";

    public readonly record struct Endpoint(string Path, string Name);

    public static class Endpoints
    {
        public static readonly Endpoint GetByUuid = new("/get/uuid", "Users.GetByUuid");
        public static readonly Endpoint GetByLogin = new("/get/login", "Users.GetByLogin");
        public static readonly Endpoint GetByEmail = new("/get/email", "Users.GetByEmail");
        public static readonly Endpoint GetByNickName = new("/get/nickname", "Users.GetByNickName");
    }
}