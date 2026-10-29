using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Core.Extensions.Mappers;

internal static class UserMapperExtension
{
    public static Claim ToClaim(this PublicUser user)
    {
        return new("user", JsonSerializer.Serialize(user, Options), JsonClaimValueTypes.Json);
    }
    
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
}