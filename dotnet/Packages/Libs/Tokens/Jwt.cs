using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace zed31rus.Packages.Libs.Tokens;

public record JwtExpires(TimeSpan Time, DateTime AtTime);

public interface IJwt
{
    JwtExpires GetExpires();
    string Create(IEnumerable<Claim> claims, TimeSpan expiresIn, string jwtSecret);
    ClaimsPrincipal Verify(string token, string jwtSecret);
}

internal class Jwt : IJwt
{
    private readonly JwtSecurityTokenHandler _tokenHandler = new();

    private TimeSpan GetExpiresTime()
    {
        return TimeSpan.FromMinutes(15);
    }

    private DateTime GetExpiresAtTime(TimeSpan expiresTime)
    {
        return DateTime.UtcNow.Add(expiresTime);
    }

    public JwtExpires GetExpires()
    {
        var time = GetExpiresTime();
        var atTime = GetExpiresAtTime(time);
        return new JwtExpires(time, atTime);
    }

    public string Create(IEnumerable<Claim> claims, TimeSpan expiresIn, string jwtSecret)
    {
        var key = Encoding.UTF8.GetBytes(jwtSecret);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.Add(expiresIn),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };

        var token = _tokenHandler.CreateToken(tokenDescriptor);
        return _tokenHandler.WriteToken(token);
    }

    public ClaimsPrincipal Verify(string token, string jwtSecret)
    {
        var key = Encoding.UTF8.GetBytes(jwtSecret);

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };

        var principal = _tokenHandler.ValidateToken(token, validationParameters, out _);
        return principal;
    }
}