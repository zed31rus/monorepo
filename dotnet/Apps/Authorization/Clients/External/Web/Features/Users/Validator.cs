using FluentValidation;
using Zed31rus.Apps.Authorization.Clients.External.Web.Validators.Rules;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;

public class UsersValidator
{
    public class GetByUuid
    {
        public class Request : AbstractValidator<UsersDto.GetByUuid.Request>
        {
            public Request()
            {
                RuleFor(x => x.Uuid).Uuid();
            }
        }
    }

    public class GetByLogin
    {
        public class Request : AbstractValidator<UsersDto.GetByLogin.Request>
        {
            public Request()
            {
                RuleFor(x => x.Login).Login();
            }
        }
    }

    public class GetByEmail
    {
        public class Request : AbstractValidator<UsersDto.GetByEmail.Request>
        {
            public Request()
            {
                RuleFor(x => x.Email).Email();
            }
        }
    }

    public class GetByNickName
    {
        public class Request : AbstractValidator<UsersDto.GetByNickName.Request>
        {
            public Request()
            {
                RuleFor(x => x.NickName).Nickname();
            }
        }
    }
}