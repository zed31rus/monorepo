using Microsoft.AspNetCore.Mvc;
using Zed31rus.Apps.Authorization.Core.Dto.User;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;

public class UsersDto
{
    public static class GetByUuid
    {
        public record Request([FromQuery]Guid Uuid);

        public record Response(PublicUser User);
    }

    public static class GetByLogin
    {
        public record Request([FromQuery] string Login);
        
        public record Response(PublicUser User);
    }
    
    public static class GetByEmail
    {
        public record Request([FromQuery] string Email);
        
        public record Response(PublicUser User);
    }
    
    public static class GetByNickName
    {
        public record Request([FromQuery] string NickName);
        
        public record Response(PublicUser User);
    }
}