namespace zed31rus.Options.Options;

public interface IConnectionOption
{
    string Database { get; }
}

public class ConnectionOption : IConnectionOption
{
    public required string Database { get; init; }
}