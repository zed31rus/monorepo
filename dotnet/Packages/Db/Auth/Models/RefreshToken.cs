namespace zed31rus.Packages.Db.Auth.Models;

public interface IRefreshToken
{
    Guid Uuid { get; }
    string HashedToken { get; }
    DateTime ExpiresAt { get; }
    DateTime CreatedAt { get; }
    Guid UserUuid { get; }
    User User { get; }
}

public class RefreshToken : IRefreshToken
{
    public Guid Uuid { get; init; } = Guid.NewGuid();
    public required string HashedToken { get; init; } = null!;
    public required DateTime ExpiresAt { get; init; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public required Guid UserUuid { get; init; }

    public required User User { get; set; } = null!;
}