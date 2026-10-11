using System.Security.Claims;
using System.Text.Json;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Core.Extensions.Mappers;

internal static class UserMapperExtension
{
    public static IEnumerable<Claim> ToClaims(this PublicUser user)
    {
        var json = JsonSerializer.SerializeToElement(user, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        foreach (var prop in json.EnumerateObject())
            yield return new Claim(prop.Name, prop.Value.ToString());
    }
}