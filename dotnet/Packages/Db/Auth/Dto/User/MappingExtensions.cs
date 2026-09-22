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
            CreatedAt = user.CreatedAt
        };
    }

    public static PersonalUser ToPersonalUser(this Models.User user)
    {
        return new PersonalUser
        {
            Uuid = user.Uuid,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            CreatedAt = user.CreatedAt,
            Login = user.Login,
            Email = user.Email,
            Locale = user.Locale,
            AllowLoginFind = user.AllowLoginFind,
            AllowEmailFind = user.AllowEmailFind,
            EmailConfirmed = user.EmailConfirmed
        };
    }

    public static InternalUser ToInternalUser(this Models.User user)
    {
        return new InternalUser
        {
            Uuid = user.Uuid,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            CreatedAt = user.CreatedAt,
            Login = user.Login,
            Email = user.Email,
            Locale = user.Locale,
            AllowLoginFind = user.AllowLoginFind,
            AllowEmailFind = user.AllowEmailFind,
            EmailConfirmed = user.EmailConfirmed,
            UpdatedAt = user.UpdatedAt
        };
    }

    public static PublicUser ToPublicUser(this PersonalUser u)
    {
        return new PublicUser
        {
            Uuid = u.Uuid, Nickname = u.Nickname, Avatar = u.Avatar, CreatedAt = u.CreatedAt
        };
    }

    public static PublicUser ToPublicUser(this InternalUser u)
    {
        return new PublicUser
        {
            Uuid = u.Uuid, Nickname = u.Nickname, Avatar = u.Avatar, CreatedAt = u.CreatedAt
        };
    }

    public static PersonalUser ToPersonalUser(this InternalUser u)
    {
        return new PersonalUser
        {
            Uuid = u.Uuid, Nickname = u.Nickname, Avatar = u.Avatar, CreatedAt = u.CreatedAt,
            Login = u.Login, Email = u.Email, Locale = u.Locale,
            AllowLoginFind = u.AllowLoginFind, AllowEmailFind = u.AllowEmailFind,
            EmailConfirmed = u.EmailConfirmed
        };
    }
}