using System.Security.Cryptography;

namespace zed31rus.Packages.Libs.Tokens;

public record RefreshTokenExpires(TimeSpan Time, DateTime AtTime);

public interface IHex
{
    RefreshTokenExpires GetExpires();
    string Create();
    bool CheckExpired(DateTime expiresAt);
}

internal class Hex : IHex
{
    private TimeSpan GetExpiresTime()
    {
        return TimeSpan.FromDays(14);
    }

    private DateTime GetExpiresAtTime(TimeSpan expiresTime)
    {
        return DateTime.UtcNow.Add(expiresTime);
    }

    public RefreshTokenExpires GetExpires()
    {
        var time = GetExpiresTime();
        var atTime = GetExpiresAtTime(time);
        return new RefreshTokenExpires(time, atTime);
    }

    public string Create()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToHexStringLower(bytes);
    }

    public bool CheckExpired(DateTime expiresAt)
    {
        return DateTime.UtcNow > expiresAt;
    }
}