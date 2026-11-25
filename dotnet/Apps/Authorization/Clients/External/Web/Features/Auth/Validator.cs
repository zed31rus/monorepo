using FluentValidation;
using Zed31rus.Apps.Authorization.Clients.External.Web.Validators.Rules;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Auth;

public class AuthValidator
{
    public class Register
    {
        public class Request : AbstractValidator<AuthDto.Register.Request>
        {
            public Request()
            {
                RuleFor(x => x.Login).Login();
                RuleFor(x => x.Nickname).Nickname();
                RuleFor(x => x.Password).Password();
                RuleFor(x => x.Email).Email();
                RuleFor(x => x.Locale).Locale();
            }
        }
    }

    public class Login
    {
        public class Request : AbstractValidator<AuthDto.Login.Request>
        {
            public Request()
            {
                RuleFor(x => x.Login).LoginBase();
                RuleFor(x => x.Password).PasswordBase();
            }
        }
    }
}