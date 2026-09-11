namespace Db.Authorization.Models;

public class VerificationCode
{
    public Guid Uuid { get; init; } = Guid.NewGuid();
    public string HashedCode { get; init; } = null!;
    public string Type { get; init; } = null!;
    public DateTime ExpiresAt { get; init; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Guid UserUuid { get; init; }
    public User User { get; set; } = null!;
}