using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using Zed31rus.Options.Infra.Options;
using Zed31rus.Packages.Infra.Exceptions;

namespace Zed31rus.Packages.Infra.Discord;

public interface IDiscordOauth
{
    Task<DiscordOauthTokenResponse> ExchangeCodeAsync(string code, CancellationToken cancellationToken = default);
    Task<DiscordOauthTokenResponse> TokenAsync(string refreshToken, CancellationToken cancellationToken = default);
}

public class DiscordOauthTokenResponse
{
    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = string.Empty;

    [JsonPropertyName("token_type")]
    public string TokenType { get; set; } = string.Empty;

    [JsonPropertyName("expires_in")]
    public int ExpiresIn { get; set; }

    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; } = string.Empty;

    [JsonPropertyName("scope")]
    public string Scope { get; set; } = string.Empty;
}

public class DiscordOauth(IDiscordOption discordOption, HttpClient httpClient): IDiscordOauth
{

    public async Task<DiscordOauthTokenResponse> ExchangeCodeAsync(
        string code,
        CancellationToken cancellationToken = default)
    {
        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["grant_type"] = "authorization_code",
            ["code"] = code
        });

        return await SendTokenRequestAsync(content, cancellationToken);
    }
        
    public async Task<DiscordOauthTokenResponse> TokenAsync(
        string refreshToken,
        CancellationToken cancellationToken = default)
    {
        var content = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["grant_type"] = "refresh_token",
            ["refresh_token"] = refreshToken
        });

        return await SendTokenRequestAsync(content, cancellationToken);
    }

    private async Task<DiscordOauthTokenResponse> SendTokenRequestAsync(
        HttpContent content, 
        CancellationToken cancellationToken)
    {
        var request = new HttpRequestMessage(HttpMethod.Post, $"{discordOption.ApiEndpoint}/oauth2/token");

        var credentials = Convert.ToBase64String(
            System.Text.Encoding.UTF8.GetBytes($"{discordOption.ClientId}:{discordOption.ClientSecret}"));
        
        request.Headers.Authorization = new AuthenticationHeaderValue("Basic", credentials);
        request.Content = content;
        
        var response = await httpClient.SendAsync(request, cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new DiscordInfraExceptions.RequestException();
        }
        
        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        var result = JsonSerializer.Deserialize<DiscordOauthTokenResponse>(json);
        
        if (result is null) 
            throw new DiscordInfraExceptions.RequestException();

        return result;
    }
}