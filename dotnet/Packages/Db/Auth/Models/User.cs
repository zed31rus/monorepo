namespace zed31rus.Packages.Db.Auth.Models;

public interface IUser
{
    Guid Uuid { get; }
    string Login { get; }
    string Email { get; }
    string Locale { get; }
    string? Nickname { get; }
    string? Avatar { get; }
    string? PasswordHash { get; }
    bool AllowLoginFind { get; }
    bool AllowEmailFind { get; }
    bool EmailConfirmed { get; }
    DateTime CreatedAt { get; }
    DateTime UpdatedAt { get; }

    ICollection<RefreshToken> Tokens { get; }
    ICollection<OauthAccount> OauthAccounts { get; }
    ICollection<VerificationCode> VerificationCodes { get; }
}

public class User: IUser
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