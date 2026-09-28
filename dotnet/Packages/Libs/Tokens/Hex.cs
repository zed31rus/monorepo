using System.Security.Cryptography;

namespace zed31rus.Packages.Libs.Tokens;

public record HexExpires(TimeSpan Time, DateTime AtTime);

public interface IHex
{
    HexExpires GetExpires();
    string Create();
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

    public HexExpires GetExpires()
    {
        var time = GetExpiresTime();
        var atTime = GetExpiresAtTime(time);
        return new HexExpires(time, atTime);
    }

    public string Create()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToHexStringLower(bytes);
    }
}