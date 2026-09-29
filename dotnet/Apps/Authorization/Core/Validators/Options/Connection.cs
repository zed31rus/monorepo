using FluentValidation;

namespace zed31rus.Apps.Authorization.Core.Validators.Options;

public class Connection : AbstractValidator<Core.Options.Connection>
{
    public Connection()
    {
        RuleFor(x => x.Database)
            .NotEmpty().WithMessage("ConnectionStrings__Database обязателен.")
            .Must(u => Uri.TryCreate(u, UriKind.Absolute, out _))
            .WithMessage("Database должен быть корректным URL");
    }
}