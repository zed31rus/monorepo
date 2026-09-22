namespace zed31rus.Packages.Db.Auth.Models;

public record PublicUser
{
    public Guid Uuid { get; init; }
    public required string Nickname { get; init; }
    public string? Avatar { get; init; }
    public DateTime CreatedAt { get; init; }
}

public record PersonalUser
{
    public Guid Uuid { get; init; }
    public required string Nickname { get; init; }
    public string? Avatar { get; init; }
    public DateTime CreatedAt { get; init; }
    public required string Login { get; init; }
    public required string Email { get; init; }
    public required string Locale { get; init; }
    public bool AllowLoginFind { get; init; }
    public bool AllowEmailFind { get; init; }
    public bool EmailConfirmed { get; init; }
}

public record InternalUser
{
    public Guid Uuid { get; init; }
    public required string Nickname { get; init; }
    public string? Avatar { get; init; }
    public DateTime CreatedAt { get; init; }
    public required string Login { get; init; }
    public required string Email { get; init; }
    public required string Locale { get; init; }
    public bool AllowLoginFind { get; init; }
    public bool AllowEmailFind { get; init; }
    public bool EmailConfirmed { get; init; }
    public DateTime UpdatedAt { get; init; }
}

public class User
{
    public Guid Uuid { get; init; } = Guid.NewGuid();
    public required string Nickname { get; set; }
    public string? Avatar { get; set; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public required string Login { get; init; }
    public required string Email { get; set; }
    public required string Locale { get; set; }
    public bool AllowLoginFind { get; set; } = true;
    public bool AllowEmailFind { get; set; } = true;
    public bool EmailConfirmed { get; set; } = false;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string? PasswordHash { get; set; }

    public ICollection<RefreshToken> Tokens { get; set; } = new List<RefreshToken>();
    public ICollection<OauthAccount> OauthAccounts { get; set; } = new List<OauthAccount>();
    public ICollection<VerificationCode> VerificationCodes { get; set; } = new List<VerificationCode>();
}