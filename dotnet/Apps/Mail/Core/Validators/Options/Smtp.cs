using FluentValidation;

namespace zed31rus.Apps.Mail.Core.Validators.Options;

internal class SmtpOptionValidator : AbstractValidator<Core.Options.SmtpOption>
{
    public SmtpOptionValidator()
    {
        RuleFor(x => x.Host)
            .NotEmpty()
            .MaximumLength(255);

        RuleFor(x => x.Port)
            .InclusiveBetween(1, 65535);

        RuleFor(x => x.User)
            .NotEmpty();

        RuleFor(x => x.Password)
            .NotEmpty();

        RuleFor(x => x.FromAddress)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.FromName)
            .NotEmpty();

        RuleFor(x => x.Security)
            .IsInEnum();
    }
}