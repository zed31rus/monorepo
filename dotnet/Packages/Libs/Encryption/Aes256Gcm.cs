using System.Security.Cryptography;
using System.Text;

namespace Zed31rus.Packages.Libs.Encryption;

public interface IAes256Gcm
{
    string Encrypt(string stringToEncrypt, string? associatedData = null);
    string Decrypt(string stringToDecrypt, string? associatedData = null);
}

public class Aes256Gcm: IAes256Gcm
{
    private const int KeySize = 32;
    private const int NonceSize = 12;
    private const int TagSize = 16;

    private readonly byte[] _key;

    public Aes256Gcm(string key)
    {
        _key = Convert.FromBase64String(key);

        if (_key.Length != KeySize)
            throw new ArgumentException($"Ключ должен быть {KeySize} байта (AES-256)");
    }

    public string Encrypt(string plainText, string? associatedData = null)
    {
        ArgumentException.ThrowIfNullOrEmpty(plainText);

        var plainBytes = Encoding.UTF8.GetBytes(plainText);

        var nonce = RandomNumberGenerator.GetBytes(NonceSize);
        var cipher = new byte[plainBytes.Length];
        var tag = new byte[TagSize];

        using var aes = new AesGcm(_key, TagSize);
        aes.Encrypt(nonce, plainBytes, cipher, tag, GetAssociatedBytes(associatedData));

        var payload = new byte[NonceSize + TagSize + cipher.Length];
        nonce.CopyTo(payload, 0);
        tag.CopyTo(payload, NonceSize);
        cipher.CopyTo(payload, NonceSize + TagSize);

        return Convert.ToBase64String(payload);
    }

    public string Decrypt(string protectedText, string? associatedData = null)
    {
        ArgumentException.ThrowIfNullOrEmpty(protectedText);

        byte[] payload;
        try
        {
            payload = Convert.FromBase64String(protectedText);
        }
        catch (FormatException)
        {
            throw new CryptographicException("Неверный формат зашифрованной строки");
        }

        if (payload.Length <= NonceSize + TagSize)
            throw new CryptographicException("Зашифрованная строка слишком короткая");

        var nonce = payload.AsSpan(0, NonceSize);
        var tag = payload.AsSpan(NonceSize, TagSize);
        var cipher = payload.AsSpan(NonceSize + TagSize);
        var plain = new byte[cipher.Length];

        using var aes = new AesGcm(_key, TagSize);
        aes.Decrypt(nonce, cipher, tag, plain, GetAssociatedBytes(associatedData));

        return Encoding.UTF8.GetString(plain);
    }

    private static byte[] GetAssociatedBytes(string? associatedData)
    {
        if (associatedData is null)
            return Array.Empty<byte>();

        return Encoding.UTF8.GetBytes(associatedData);
    }
}