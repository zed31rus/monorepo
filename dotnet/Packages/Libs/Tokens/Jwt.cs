using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace Zed31rus.Packages.Libs.Tokens;

public interface IJwt
{
    string Create(IEnumerable<Claim> claims, TokenValidationParameters validationParameters, TimeSpan expiresIn);
    ClaimsPrincipal Verify(string token, TokenValidationParameters validationParameters);
}

public class Jwt() : IJwt
{
    private readonly JwtSecurityTokenHandler _tokenHandler = new();

    public string Create(IEnumerable<Claim> claims, TokenValidationParameters validationParameters, TimeSpan expiresIn)
    {

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(expiresIn),
            Issuer = validationParameters.ValidIssuer,
            Audience = validationParameters.ValidAudience,
            SigningCredentials = new SigningCredentials(
                validationParameters.IssuerSigningKey,
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);
        return _tokenHandler.WriteToken(token);
    }

    public ClaimsPrincipal Verify(string token, TokenValidationParameters validationParameters)
    {
        var principal = _tokenHandler.ValidateToken(token, validationParameters, out _);
        return principal;
    }
}