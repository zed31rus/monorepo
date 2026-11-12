using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Zed31rus.Options.Auth.Options;

namespace Zed31rus.Options.Auth.Values;

public  static class ExampleValues
{
    public static readonly JwtOption Jwt = new()
    {
        ExpiresIn = TimeSpan.FromMinutes(15),
        TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(""u8.ToArray()),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        }
    };

    public static readonly SessionOption Session = new()
    {
        Cookies = new()
        {
            Access = new()
            {
                Name = "accessToken",
                Options = new CookieOptions
                {
                    Path = "/",
                    HttpOnly = false,
                    SameSite = SameSiteMode.Lax,
                    Secure = false,
                    Expires = DateTimeOffset.UtcNow.AddMinutes(15)
                }
            },
            Refresh = new()
            {
                Name = "refreshToken",
                Options = new CookieOptions
                {
                    Path = "/",
                    HttpOnly = true,
                    SameSite = SameSiteMode.Lax,
                    Secure = false,
                    Expires = DateTimeOffset.UtcNow.AddDays(14)
                }
            }
        }
    };

    public static readonly AuthOption Auth = new()
    {
        DummyPasswordHash = "$argon2id$v=19$m=65536,t=3,p=4$3I+4zxM3XsUAFibLbKm4CA$itjGhZi7sUXbZnefyvNoka8k2vUdn+i2dDHv0cVhj1w"
    };

    public static readonly ConnectionOption Connection = new()
    {
        Database = "Host=localhost;Port=5432;Database=db;Username=dev;Password=dev"
    };
}