using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Packages.Db.Auth.Dto.User;

public static class MappingExtensions
{
    public static PublicUser ToPublicUser(this IPublicUser user)
    {
        return new PublicUser
        {
            Uuid = user.Uuid,
            Nickname = user.Nickname,
            Avatar = user.Avatar,
            CreatedAt = user.CreatedAt
        };
    }

    public static PersonalUser ToPersonalUser(this IPersonalUser user)
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

    public static InternalUser ToInternalUser(this IInternalUser user)
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
}