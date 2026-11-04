using Microsoft.IdentityModel.Tokens;

namespace Zed31rus.Options.Auth.Options;

public interface IJwtOption
{
    TokenValidationParameters TokenValidationOption { get; }
    TimeSpan ExpiresIn { get; }
}

public class JwtOption : IJwtOption
{
    public required TokenValidationParameters TokenValidationOption { get; init; }
    public required TimeSpan ExpiresIn { get; init; }
}