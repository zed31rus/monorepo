using System.Security.Cryptography;
using System.Text;
using Konscious.Security.Cryptography;

namespace zed31rus.Packages.Libs.Hash;

public interface IArgon2
{
    Task<string> CreateAsync(string password);
    Task<bool> CompareAsync(string password, string phcHash);
}

internal class Argon2: IArgon2
{
    private const int DegreeOfParallelism = 4;
    private const int MemorySize = 65536; // 64 MB
    private const int Iterations = 3;
    private const int SaltSize = 16;      // 128 bit
    private const int HashSize = 32;      // 256 bit

    public async Task<string> CreateAsync(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
        
        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = DegreeOfParallelism,
            MemorySize = MemorySize,
            Iterations = Iterations
        };

        byte[] hash = await argon2.GetBytesAsync(HashSize);

        string saltBase64 = Convert.ToBase64String(salt).TrimEnd('=');
        string hashBase64 = Convert.ToBase64String(hash).TrimEnd('=');

        return $"$argon2id$v=19$m={MemorySize},t={Iterations},p={DegreeOfParallelism}${saltBase64}${hashBase64}";
    }

    public async Task<bool> CompareAsync(string password, string phcHash)
    {
        string[] parts = phcHash.Split('$');
        if (parts.Length < 6 || parts[1] != "argon2id")
        {
            return false;
        }

        int memoryCost = MemorySize;
        int timeCost = Iterations;
        int parallelism = DegreeOfParallelism;

        string[] paramPairs = parts[3].Split(',');
        foreach (var pair in paramPairs)
        {
            string[] keyValue = pair.Split('=');
            if (keyValue.Length != 2) continue;

            switch (keyValue[0])
            {
                case "m": int.TryParse(keyValue[1], out memoryCost); break;
                case "t": int.TryParse(keyValue[1], out timeCost); break;
                case "p": int.TryParse(keyValue[1], out parallelism); break;
            }
        }

        byte[] salt = Base64UrlDecode(parts[4]);
        byte[] expectedHash = Base64UrlDecode(parts[5]);

        using var argon2 = new Argon2id(Encoding.UTF8.GetBytes(password))
        {
            Salt = salt,
            DegreeOfParallelism = parallelism,
            MemorySize = memoryCost,
            Iterations = timeCost
        };

        byte[] computedHash = await argon2.GetBytesAsync(expectedHash.Length);

        return CryptographicOperations.FixedTimeEquals(computedHash, expectedHash);
    }

    private static byte[] Base64UrlDecode(string base64)
    {
        string padded = base64.PadRight(base64.Length + (4 - base64.Length % 4) % 4, '=');
        return Convert.FromBase64String(padded);
    }
}