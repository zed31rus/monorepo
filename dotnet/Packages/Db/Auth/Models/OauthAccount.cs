namespace zed31rus.Packages.Db.Auth.Models;

public interface IOauthAccount
{
    Guid Uuid { get; }
    string Provider { get; }
    string ProviderUserId { get; }
    string Locale { get; }
    string? AccessToken { get; }
    string? RefreshToken { get; }
    DateTime? ExpiresAt { get; }
    string? Scope { get; }
    string? RawProfile { get; }
    Guid UserUuid { get; }
    User User { get; }
    DateTime CreatedAt { get; }
    DateTime UpdatedAt { get; }
}

public class OauthAccount : IOauthAccount
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