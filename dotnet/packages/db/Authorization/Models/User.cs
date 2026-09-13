namespace Db.Authorization.Models;

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