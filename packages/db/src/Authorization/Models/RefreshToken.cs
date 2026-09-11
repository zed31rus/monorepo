namespace Db.Authorization.Models;

public class RefreshToken
{
    public Guid Uuid { get; init; } = Guid.NewGuid();
    public string HashedToken { get; init; } = null!;
    public DateTime ExpiresAt { get; init; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Guid UserUuid { get; init; }
    
    public User User { get; set; } = null!; 
}