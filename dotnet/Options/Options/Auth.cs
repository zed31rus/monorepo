namespace zed31rus.Options.Options;

public interface IAuthOption
{
    string DummyPasswordHash { get; }
}

public class AuthOption : IAuthOption
{
    public required string DummyPasswordHash { get; init; }
}