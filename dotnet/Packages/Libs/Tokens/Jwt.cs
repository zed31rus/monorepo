using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using zed31rus.Options.Options;

namespace zed31rus.Packages.Libs.Tokens;

public record JwtExpires(TimeSpan Time, DateTime AtTime);

public interface IJwt
{
    JwtExpires GetExpires();
    string Create(IEnumerable<Claim> claims, TimeSpan expiresIn);
    ClaimsPrincipal Verify(string token);
}

public class Jwt(IJwtOption jwtOption) : IJwt
{
    private readonly JwtSecurityTokenHandler _tokenHandler = new();

    private DateTime GetExpiresAtTime(TimeSpan expiresTime)
    {
        return DateTime.UtcNow.Add(expiresTime);
    }

    public JwtExpires GetExpires()
    {
        var time = jwtOption.ExpiresIn;
        var atTime = GetExpiresAtTime(time);
        return new JwtExpires(time, atTime);
    }

    public string Create(IEnumerable<Claim> claims, TimeSpan expiresIn)
    {
        var validation = jwtOption.TokenValidationOption;

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(expiresIn),
            Issuer = validation.ValidIssuer,
            Audience = validation.ValidAudience,
            SigningCredentials = new SigningCredentials(
                validation.IssuerSigningKey,
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);
        return _tokenHandler.WriteToken(token);
    }

    public ClaimsPrincipal Verify(string token)
    {
        var principal = _tokenHandler.ValidateToken(token, jwtOption.TokenValidationOption, out _);
        return principal;
    }
}