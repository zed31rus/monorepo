namespace Zed31rus.Options.Infra.Options;

public interface IDiscordOption
{
    public string ClientId { get; }
    public string ClientSecret { get; }
    
    public string ApiEndpoint { get; }
}

public class DiscordOption: IDiscordOption
{
    public required string ClientId { get; init; }
    public required string ClientSecret { get; init; }
    public required string ApiEndpoint { get; init; }
}