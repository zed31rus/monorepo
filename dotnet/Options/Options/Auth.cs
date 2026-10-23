namespace zed31rus.Options.Options;

public interface IAuthOption
{
    string DummyPasswordHash { get; }
}

internal class AuthOption : IAuthOption
{
    public required string DummyPasswordHash { get; init; }
}