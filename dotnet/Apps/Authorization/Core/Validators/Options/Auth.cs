using FluentValidation;

namespace zed31rus.Apps.Authorization.Core.Validators.Options;

internal class AuthOptionValidator : AbstractValidator<Core.Options.AuthOption>
{
    public AuthOptionValidator()
    {
        RuleFor(x => x.DummyPasswordHash)
            .NotEmpty().WithMessage("ENV: Auth__DummyPasswordHash обязателен.");
    }
}