using FluentValidation;
using Npgsql;

namespace zed31rus.Apps.Authorization.Core.Validators.Options;

internal class ConnectionOptionValidator : AbstractValidator<Core.Options.ConnectionOption>
{
    public ConnectionOptionValidator()
    {
        RuleFor(x => x.Database)
            .NotEmpty().WithMessage("Connection__Database обязателен.")
            .Must(BeValidNpgsqlConnectionString)
            .WithMessage(
                "Database должен быть корректной строкой подключения Npgsql (Host=...;Port=...;Database=...;Username=...;Password=...)");
    }

    private static bool BeValidNpgsqlConnectionString(string? value)
    {
        try
        {
            _ = new NpgsqlConnectionStringBuilder(value);
            return true;
        }
        catch (ArgumentException)
        {
            return false;
        }
    }
}