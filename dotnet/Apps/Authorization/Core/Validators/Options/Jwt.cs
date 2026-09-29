using FluentValidation;

namespace zed31rus.Apps.Authorization.Core.Validators.Options;

internal class Jwt : AbstractValidator<Core.Options.Jwt>
{
    public Jwt()
    {
        RuleFor(x => x.Secret)
            .NotEmpty().WithMessage("ENV: JWT__Secret обязателен.")
            .MinimumLength(32).WithMessage("JwtSecret должен быть минимум 32 символа для HMAC-SHA256");

        RuleFor(x => x.ExpiresInMinutes)
            .InclusiveBetween(1, 1440).WithMessage("Срок жизни токена должен быть от 1 мин до 24 часов");
    }
}