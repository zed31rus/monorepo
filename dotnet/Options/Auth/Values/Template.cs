using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Zed31rus.Options.Auth.Options;
using Zed31rus.Options.Shared.Attributes;
using Zed31rus.Options.Shared.Constants;

namespace Zed31rus.Options.Auth.Values;

public  static class ExampleValues
{
    [Value(ValueConstants.ValueTypes.Template)]
    public static readonly IJwtOption Jwt = new JwtOption()
    {
        ExpiresIn = TimeSpan.FromMinutes(15),
        TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"u8.ToArray()),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        }
    };

    [Value(ValueConstants.ValueTypes.Template)]
    public static readonly ISessionOption Session = new SessionOption()
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
                    MaxAge = TimeSpan.FromDays(14)
                }
            },
            Refresh = new()
            {
                Name = "refreshToken",
                Options = new CookieOptions
                {
                    Path = "/auth/refresh",
                    HttpOnly = true,
                    SameSite = SameSiteMode.Lax,
                    Secure = false,
                    MaxAge = TimeSpan.FromDays(14)
                }
            }
        }
    };

    [Value(ValueConstants.ValueTypes.Template)]
    public static readonly IAuthOption Auth = new AuthOption()
    {
        DummyPasswordHash = "$argon2id$v=19$m=65536,t=3,p=4$AAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAA"
    };

    [Value(ValueConstants.ValueTypes.Template)]
    public static readonly IConnectionOption Connection = new ConnectionOption()
    {
        Database = "Host=localhost;Port=54321;Database=Template;Username=Template;Password=Template"
    };
}