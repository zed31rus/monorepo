using Microsoft.IdentityModel.Tokens;

namespace Zed31rus.Options.Auth.Options;

public interface IJwtOption
{
    TokenValidationParameters TokenValidationParameters { get; }
    TimeSpan ExpiresIn { get; }
    DateTime ExpiresAt { get; }
}

public class JwtOption : IJwtOption
{
    public required TokenValidationParameters TokenValidationParameters { get; init; }
    public required TimeSpan ExpiresIn { get; init; }
    public DateTime ExpiresAt => DateTime.UtcNow.Add(ExpiresIn);
}