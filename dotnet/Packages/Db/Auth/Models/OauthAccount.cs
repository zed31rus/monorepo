namespace Zed31rus.Packages.Db.Auth.Models;

public class OauthAccount
{
    public Guid Uuid { get; init; } = Guid.NewGuid();

    public required string Provider { get; init; }
    public required string ProviderUserId { get; init; }
    public string? EncryptedRefreshToken { get; set; }
    public string? Scope { get; set; }

    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public required Guid UserUuid { get; init; }
    public User User { get; set; } = null!;
    
    public uint Version { get; set; }
}