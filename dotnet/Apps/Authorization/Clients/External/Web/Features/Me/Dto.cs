using Zed31rus.Apps.Authorization.Core.Dto.User;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Me;

public static class MeDto
{
    public static class Get
    {
        public record Response(PersonalUser User);
    }

    public static class UpdateNickname
    {
        public record Request(string Nickname);
        public record Response(PersonalUser User);
    }

    public static class UpdateEmailFind
    {
        public record Request(bool AllowEmailFind);
        public record Response(PersonalUser User);
    }

    public static class UpdateLoginFind
    {
        public record Request(bool AllowLoginFind);
        public record Response(PersonalUser User);
    }
}