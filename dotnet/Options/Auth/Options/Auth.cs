namespace zed31rus.Options.Auth.Options;

public interface IAuthOption
{
    string DummyPasswordHash { get; }
}

public class AuthOption : IAuthOption
{
    public required string DummyPasswordHash { get; init; }
}