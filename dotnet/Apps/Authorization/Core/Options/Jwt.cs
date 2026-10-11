namespace zed31rus.Apps.Authorization.Core.Options;

internal class JwtOption
{
    public string Secret { get; set; } = string.Empty;
    public int ExpiresInMinutes { get; set; }
}