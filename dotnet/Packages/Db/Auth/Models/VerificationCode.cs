namespace zed31rus.Packages.Db.Auth.Models;

public interface IVerificationCode
{
    public Guid Uuid { get; }
    public string HashedCode { get; }
    public string Type { get; }
    public DateTime ExpiresAt { get; }
    public DateTime CreatedAt { get; }
    public Guid UserUuid { get; }
    public User User { get; }
}

public class VerificationCode: IVerificationCode
{
    public Guid Uuid { get; init; } = Guid.NewGuid();
    public string HashedCode { get; init; } = null!;
    public string Type { get; init; } = null!;
    public DateTime ExpiresAt { get; init; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Guid UserUuid { get; init; }
    public User User { get; set; } = null!;
}