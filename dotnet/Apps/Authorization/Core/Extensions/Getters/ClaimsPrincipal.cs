using System.Security.Claims;
using System.Text.Json;
using zed31rus.Apps.Authorization.Core.Exceptions;
using zed31rus.Packages.Db.Auth.Dto.User;

namespace zed31rus.Apps.Authorization.Core.Extensions.Getters;

public static class ClaimsPrincipalGetterExtension
{
    public static PublicUser GetPublicUser(this ClaimsPrincipal principal)
    {
        string? json = principal.FindFirstValue("user");
        if (json is null) throw new CoreBusinessExceptions.UserNotFoundException();
        var user = JsonSerializer.Deserialize<PublicUser>(json, Options);
        if (user is null) throw new CoreBusinessExceptions.UserNotFoundException();

        return user;
    }
    
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
    };
}