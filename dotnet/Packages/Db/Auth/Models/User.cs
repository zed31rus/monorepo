namespace zed31rus.Packages.Db.Auth.Models;

public class User
{
    public Guid Uuid { get; init; } = Guid.NewGuid();

    public required string Login { get; init; }
    public required string Email { get; set; }
    public required string Nickname { get; set; }
    public string? Avatar { get; set; }
    public required string Locale { get; set; }
    public required string Role { get; set; }
    public string? PasswordHash { get; set; }

    public bool EmailConfirmed { get; set; }
    public bool Confirmed => EmailConfirmed;
    public bool AllowEmailFind { get; set; } = true;
    public bool AllowLoginFind { get; set; } = true;

    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<OauthAccount> OauthAccounts { get; set; } = new List<OauthAccount>();
    public ICollection<RefreshToken> Tokens { get; set; } = new List<RefreshToken>();
    public ICollection<VerificationCode> VerificationCodes { get; set; } = new List<VerificationCode>();
}