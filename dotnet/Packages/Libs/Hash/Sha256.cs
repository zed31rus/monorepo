using System.Security.Cryptography;
using System.Text;

namespace zed31rus.Packages.Libs.Hash;

public interface ISha256
{
    Task<string> CreateAsync(string password);
}

internal class Sha256: ISha256
{
    public Task<string> CreateAsync(string password)
    {
        byte[] inputBytes = Encoding.UTF8.GetBytes(password);
        byte[] hashBytes = SHA256.HashData(inputBytes);
            
        return Task.FromResult(Convert.ToHexString(hashBytes).ToLowerInvariant());
    }
}
