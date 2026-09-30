using FluentValidation;
using Npgsql;

namespace zed31rus.Apps.Authorization.Core.Validators.Options;

public class Connection : AbstractValidator<Core.Options.Connection>
{
    public Connection()
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