namespace zed31rus.Options.Options;

public interface IConnectionOption
{
    string Database { get; }
}

internal class ConnectionOption : IConnectionOption
{
    public required string Database { get; init; }
}