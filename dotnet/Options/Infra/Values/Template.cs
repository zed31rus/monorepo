using Zed31rus.Options.Infra.Options;
using Zed31rus.Options.Shared.Attributes;
using Zed31rus.Options.Shared.Constants;

namespace Zed31rus.Options.Infra.Values;

public  static class ExampleValues
{
    [Value(ValueConstants.ValueTypes.Template)]
    public static readonly DiscordOption Jwt = new()
    {
        ClientId = "123456789012345678",
        ClientSecret = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        ApiEndpoint = "https://nicetemplate.website"
    };
}