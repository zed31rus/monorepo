namespace Db.Authorization.Models;

public class OauthAccount
{
    public Guid Uuid { get; init; } = Guid.NewGuid();
    public string Provider { get; init; } = null!;
    public string ProviderUserId { get; set; } = null!;
    public string Locale { get; set; } = "ru";
    public string? AccessToken { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? ExpiresAt { get; set; }
    public string? Scope { get; set; }
    
    public string? RawProfile { get; set; }

    public Guid UserUuid { get; init; }
    public User User { get; set; } = null!;

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; }
}