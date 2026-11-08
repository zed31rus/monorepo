using System.Security.Cryptography;

namespace Zed31rus.Packages.Libs.Tokens;

public interface IHex
{
    string Create();
}

public class Hex : IHex
{
    public string Create()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToHexStringLower(bytes);
    }
}