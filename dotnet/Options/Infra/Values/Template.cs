using Zed31rus.Options.Infra.Options;

namespace Zed31rus.Options.Infra.Values;

public  static class ExampleValues
{
    public static readonly DiscordOption Jwt = new()
    {
        ClientId = "123456789012345678",
        ClientSecret = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        ApiEndpoint = "https://nicetemplate.website"
    };
}