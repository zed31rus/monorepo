namespace Zed31rus.Options.Auth.Options;

public interface IEncryptionOption
{
    string Key { get; }
}

public class EncryptionOption : IEncryptionOption
{
    public required string Key { get; init; }
}