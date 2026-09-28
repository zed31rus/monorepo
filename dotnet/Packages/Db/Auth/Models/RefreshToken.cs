namespace zed31rus.Packages.Db.Auth.Models;

public class RefreshToken
{
    public Guid Uuid { get; init; } = Guid.NewGuid();

    public required string HashedToken { get; init; }
    public required DateTime ExpiresAt { get; init; }

    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;

    public required Guid UserUuid { get; init; }
    public User User { get; set; } = null!;
}