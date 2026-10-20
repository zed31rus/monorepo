using FluentValidation;
using zed31rus.Apps.Authorization.Clients.External.Web.Options;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Validators.Options;

internal class CookieOptionsValidator : AbstractValidator<CookieOptions>
{
    public CookieOptionsValidator()
    {
        RuleFor(x => x.Path).NotEmpty();

        RuleFor(x => x.MaxAge)
            .NotNull()
            .Must(v => v > TimeSpan.Zero)
            .When(x => x.MaxAge is not null)
            .WithMessage("MaxAge must be more then 0");

        RuleFor(x => x.Secure)
            .Equal(true)
            .When(x => x.SameSite == SameSiteMode.None)
            .WithMessage("SameSite=None requires Secure=true");
    }
}

internal class SessionCookieValidator : AbstractValidator<SessionCookie>
{
    public SessionCookieValidator(IValidator<CookieOptions> optionsValidator)
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .Matches("^[A-Za-z0-9!#$%&'*+.^_`|~-]+$")
            .WithMessage("Недопустимые символы в имени cookie");

        RuleFor(x => x.Options)
            .NotNull()
            .SetValidator(optionsValidator);
    }
}

internal class SessionOptionsValidator : AbstractValidator<Session>
{
    public SessionOptionsValidator(IValidator<SessionCookie> cookieValidator)
    {
        RuleFor(x => x.Cookies).NotNull();

        RuleFor(x => x.Cookies.Refresh).SetValidator(cookieValidator);
        RuleFor(x => x.Cookies.Access).SetValidator(cookieValidator);

        RuleFor(x => x.Cookies)
            .Must(c => c.Refresh.Name != c.Access.Name)
            .WithMessage("Имена refresh и access cookie должны отличаться");
    }
}