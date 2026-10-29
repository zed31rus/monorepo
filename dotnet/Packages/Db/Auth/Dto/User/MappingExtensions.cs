using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth.Dto.User;

public static class MappingExtensions
{
    public static PublicUser ToPublicUser(this Models.User user)
    {
        return new PublicUser
        {
            Uuid = user.Uuid,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            Role = user.Role,
            CreatedAt = user.CreatedAt
        };
    }

    public static PersonalUser ToPersonalUser(this Models.User user)
    {
        return new PersonalUser
        {
            Uuid = user.Uuid,
            Login = user.Login,
            Email = user.Email,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            Locale = user.Locale,
            Role = user.Role,
            EmailConfirmed = user.EmailConfirmed,
            AllowEmailFind = user.AllowEmailFind,
            AllowLoginFind = user.AllowLoginFind,
            CreatedAt = user.CreatedAt
        };
    }

    public static InternalUser ToInternalUser(this Models.User user)
    {
        return new InternalUser
        {
            Uuid = user.Uuid,
            Login = user.Login,
            Email = user.Email,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            Locale = user.Locale,
            Role = user.Role,
            EmailConfirmed = user.EmailConfirmed,
            Confirmed = user.Confirmed,
            AllowEmailFind = user.AllowEmailFind,
            AllowLoginFind = user.AllowLoginFind,
            CreatedAt = user.CreatedAt,
            UpdatedAt = user.UpdatedAt
        };
    }

    public static PublicUser ToPublicUser(this PersonalUser user)
    {
        return new PublicUser
        {
            Uuid = user.Uuid,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            Role = user.Role,
            CreatedAt = user.CreatedAt
        };
    }

    public static PublicUser ToPublicUser(this InternalUser user)
    {
        return new PublicUser
        {
            Uuid = user.Uuid,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            Role = user.Role,
            CreatedAt = user.CreatedAt
        };
    }

    public static PersonalUser ToPersonalUser(this InternalUser user)
    {
        return new PersonalUser
        {
            Uuid = user.Uuid,
            Login = user.Login,
            Email = user.Email,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            Locale = user.Locale,
            Role = user.Role,
            EmailConfirmed = user.EmailConfirmed,
            AllowEmailFind = user.AllowEmailFind,
            AllowLoginFind = user.AllowLoginFind,
            CreatedAt = user.CreatedAt
        };
    }
}