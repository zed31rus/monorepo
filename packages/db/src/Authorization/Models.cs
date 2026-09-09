namespace Db.Authorization;

public class User
{
    public Guid Uuid { get; init; } = Guid.NewGuid(); 
    public string Login { get; init; } = null!;
    public string Email { get; set; } = null!;
    public string Locale { get; set; } = null!;
    public string? Nickname { get; set; }
    public string? Avatar { get; set; }
    public string? PasswordHash { get; set; }
    public bool AllowLoginFind { get; set; } = true;
    public bool AllowEmailFind { get; set; } = true;
    public bool EmailConfirmed { get; set; } = false;
    
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow; 
    public DateTime UpdatedAt { get; set; }

    public ICollection<RefreshToken> Tokens { get; set; } = new List<RefreshToken>();
    public ICollection<OauthAccount> OauthAccounts { get; set; } = new List<OauthAccount>();
    public ICollection<VerificationCode> VerificationCodes { get; set; } = new List<VerificationCode>();
}

public class RefreshToken
{
    public Guid Uuid { get; init; } = Guid.NewGuid();
    public string HashedToken { get; init; } = null!;
    public DateTime ExpiresAt { get; init; }
    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public Guid UserUuid { get; init; }
    
    public User User { get; set; } = null!; 
}

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