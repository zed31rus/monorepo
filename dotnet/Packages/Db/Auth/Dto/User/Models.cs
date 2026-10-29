namespace zed31rus.Packages.Db.Auth.Dto.User;

public record PublicUser
{
    public Guid Uuid { get; init; }
    public required string Nickname { get; init; }
    public string? Avatar { get; init; }
    public required string Role { get; set; }
    public DateTime CreatedAt { get; init; }
}

public record PersonalUser
{
    public Guid Uuid { get; init; }

    public required string Login { get; init; }
    public required string Email { get; init; }
    public required string Nickname { get; init; }
    public string? Avatar { get; init; }
    public required string Locale { get; init; }
    public required string Role { get; set; }

    public bool EmailConfirmed { get; init; }
    public bool AllowEmailFind { get; init; }
    public bool AllowLoginFind { get; init; }

    public DateTime CreatedAt { get; init; }
}

public record InternalUser
{
    public Guid Uuid { get; init; }

    public required string Login { get; init; }
    public required string Email { get; init; }
    public required string Nickname { get; init; }
    public string? Avatar { get; init; }
    public required string Locale { get; init; }
    public required string Role { get; set; }

    public bool EmailConfirmed { get; init; }
    public bool Confirmed { get; init; }
    public bool AllowEmailFind { get; init; }
    public bool AllowLoginFind { get; init; }

    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
}
