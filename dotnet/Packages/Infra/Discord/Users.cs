using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Zed31rus.Options.Infra.Options;
using Zed31rus.Packages.Infra.Exceptions;

namespace Zed31rus.Packages.Infra.Discord;

public interface IDiscordUsers
{
    Task<DiscordUser> MeAsync(string accessToken, CancellationToken cancellationToken = default);
}

public class DiscordUsers(IDiscordOption discordOption, HttpClient httpClient): IDiscordUsers
{
    
    public async Task<DiscordUser> MeAsync(string accessToken, CancellationToken cancellationToken = default)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, $"{discordOption.ApiEndpoint}/users/@me");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        using var response = await httpClient.SendAsync(request, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new DiscordInfraExceptions.RequestException();
        }

        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        var result = JsonSerializer.Deserialize<DiscordUser>(json);

        if (result is null)
            throw new DiscordInfraExceptions.RequestException();

        return result;
    }
}

public class DiscordUser
{
    [JsonPropertyName("id")]
    public required string Id { get; init; }

    [JsonPropertyName("username")]
    public required string Username { get; init; }

    [JsonPropertyName("discriminator")]
    public required string Discriminator { get; init; }
    
    [JsonPropertyName("global_name")]
    public string? GlobalName { get; init; }

    [JsonPropertyName("avatar")]
    public string? Avatar { get; init; }
    
    [JsonPropertyName("bot")]
    public bool? Bot { get; init; }

    [JsonPropertyName("system")]
    public bool? System { get; init; }

    [JsonPropertyName("mfa_enabled")]
    public bool? MfaEnabled { get; init; }
    
    [JsonPropertyName("banner")]
    public string? Banner { get; init; }
    
    [JsonPropertyName("accent_color")]
    public int? AccentColor { get; init; }

    [JsonPropertyName("locale")]
    public string? Locale { get; init; }
    
    [JsonPropertyName("verified")]
    public bool? Verified { get; init; }
    
    [JsonPropertyName("email")]
    public string? Email { get; init; }

    [JsonPropertyName("flags")]
    public DiscordUserFlags? Flags { get; init; }
    
    [JsonPropertyName("premium_type")]
    public DiscordPremiumType? PremiumType { get; init; }

    [JsonPropertyName("public_flags")]
    public DiscordUserFlags? PublicFlags { get; init; }

    [JsonPropertyName("avatar_decoration_data")]
    public DiscordAvatarDecorationData? AvatarDecorationData { get; init; }

    [JsonPropertyName("collectibles")]
    public DiscordCollectibles? Collectibles { get; init; }

    [JsonPropertyName("primary_guild")]
    public DiscordPrimaryGuild? PrimaryGuild { get; init; }
}

[Flags]
public enum DiscordUserFlags
{
    None = 0,
    Staff = 1 << 0,
    Partner = 1 << 1,
    Hypesquad = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HypesquadOnlineHouse1 = 1 << 6,
    HypesquadOnlineHouse2 = 1 << 7,
    HypesquadOnlineHouse3 = 1 << 8,
    PremiumEarlySupporter = 1 << 9,
    TeamPseudoUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedDeveloper = 1 << 17,
    CertifiedModerator = 1 << 18,
    BotHttpInteractions = 1 << 19,
}

public enum DiscordPremiumType
{
    None = 0,
    NitroClassic = 1,
    Nitro = 2,
    NitroBasic = 3,
}

public class DiscordAvatarDecorationData
{
    [JsonPropertyName("asset")]
    public required string Asset { get; init; }

    [JsonPropertyName("sku_id")]
    public required string SkuId { get; init; }
}

public class DiscordCollectibles
{
    [JsonPropertyName("nameplate")]
    public DiscordNameplate? Nameplate { get; init; }
}

public class DiscordNameplate
{
    [JsonPropertyName("sku_id")]
    public required string SkuId { get; init; }

    [JsonPropertyName("asset")]
    public required string Asset { get; init; }

    [JsonPropertyName("label")]
    public string? Label { get; init; }
    
    [JsonPropertyName("palette")]
    public required string Palette { get; init; }
}

public class DiscordPrimaryGuild
{
    [JsonPropertyName("identity_guild_id")]
    public string? IdentityGuildId { get; init; }
    
    [JsonPropertyName("identity_enabled")]
    public bool? IdentityEnabled { get; init; }

    [JsonPropertyName("tag")]
    public string? Tag { get; init; }

    [JsonPropertyName("badge")]
    public string? Badge { get; init; }
}