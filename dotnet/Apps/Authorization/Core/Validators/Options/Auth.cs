using FluentValidation;

namespace zed31rus.Apps.Authorization.Core.Validators.Options;

public class Auth : AbstractValidator<Core.Options.Auth>
{
    public Auth()
    {
        RuleFor(x => x.DummyPasswordHash)
            .NotEmpty().WithMessage("ENV: Auth__DummyPasswordHash обязателен.");
    }
}