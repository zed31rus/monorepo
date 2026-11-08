using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Zed31rus.Options.Infra.Options;
using Zed31rus.Packages.Infra.Exceptions;

namespace Zed31rus.Packages.Infra.Discord;

public class DiscordOauthTokenReply
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

public class DiscordOauthCodeExchangeReply
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

public class DiscordOauth(IDiscordOption discordOption)
{
        private HttpClient _httpClient = new();

        public async Task<DiscordOauthCodeExchangeReply> ExchangeCodeAsync(
            string code,
            CancellationToken cancellationToken = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"{discordOption.ApiEndpoint}/oauth2/token");

            var credentials = Convert.ToBase64String(
                Encoding.UTF8.GetBytes($"{discordOption.ClientId}:{discordOption.ClientSecret}"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", credentials);

            request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["grant_type"] = "authorization_code",
                ["code"] = code
            });
            
            var response = await _httpClient.SendAsync(request, cancellationToken);
            
            var json = await response.Content.ReadAsStringAsync(cancellationToken);

            var result = JsonSerializer.Deserialize<DiscordOauthCodeExchangeReply>(json);
            
            if (result is null) throw new DiscordInfraExceptions.RequestException();

            return result;
        }
        
        public async Task<DiscordOauthTokenReply> TokenAsync(
            string refreshToken,
            CancellationToken cancellationToken = default)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"{discordOption.ApiEndpoint}/oauth2/token");

            var credentials = Convert.ToBase64String(
                Encoding.UTF8.GetBytes($"{discordOption.ClientId}:{discordOption.ClientSecret}"));
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", credentials);
            request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                ["grant_type"] = "refresh_token",
                ["refresh_token"] = refreshToken
            });
            
            var response = await _httpClient.SendAsync(request, cancellationToken);
            
            var json = await response.Content.ReadAsStringAsync(cancellationToken);

            var result = JsonSerializer.Deserialize<DiscordOauthTokenReply>(json);
            
            if (result is null) throw new DiscordInfraExceptions.RequestException();

            return result;
        }
    
}