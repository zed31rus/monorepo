using Microsoft.IdentityModel.Tokens;

namespace zed31rus.Options.Options;

public interface IJwtOption
{
    TokenValidationParameters TokenValidationOption { get; }
    TimeSpan ExpiresIn { get; }
}

internal class JwtOption : IJwtOption
{
    public required TokenValidationParameters TokenValidationOption { get; init; }
    public required TimeSpan ExpiresIn { get; init; }
}