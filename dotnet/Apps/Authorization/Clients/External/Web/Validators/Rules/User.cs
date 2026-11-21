using FluentValidation;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Validators.Rules;

public static class ValidatorsRulesUser
{
    private const int LoginMin = 3;
    private const int LoginMax = 32;
    private const int NicknameMin = 2;
    private const int NicknameMax = 32;
    private const int PasswordMin = 8;
    private const int PasswordMax = 128;
    private const int EmailMax = 254;

    private static readonly HashSet<string> SupportedLocales = new(StringComparer.OrdinalIgnoreCase)
    {
        "ru", "en"
    };
    
    public static IRuleBuilderOptions<T, Guid> Uuid<T>(this IRuleBuilder<T, Guid> rule) =>
        rule
            .NotEmpty().WithMessage("UUID_REQUIRED");

    public static IRuleBuilderOptions<T, string> Login<T>(this IRuleBuilder<T, string> rule) =>
        rule
            .NotEmpty().WithMessage("LOGIN_REQUIRED")
            .MinimumLength(LoginMin).WithMessage($"LOGIN_MIN_LENGTH_{LoginMin}")
            .MaximumLength(LoginMax).WithMessage($"LOGIN_MAX_LENGTH_{LoginMax}")
            .Matches("^[a-zA-Z0-9_.-]+$").WithMessage("LOGIN_INVALID_FORMAT");

    public static IRuleBuilderOptions<T, string> Nickname<T>(this IRuleBuilder<T, string> rule) =>
        rule
            .NotEmpty().WithMessage("NICKNAME_REQUIRED")
            .MinimumLength(NicknameMin).WithMessage($"NICKNAME_MIN_LENGTH_{NicknameMin}")
            .MaximumLength(NicknameMax).WithMessage($"NICKNAME_MAX_LENGTH_{NicknameMax}");

    public static IRuleBuilderOptions<T, string> Password<T>(this IRuleBuilder<T, string> rule) =>
        rule
            .NotEmpty().WithMessage("PASSWORD_REQUIRED")
            .MinimumLength(PasswordMin).WithMessage($"PASSWORD_MIN_LENGTH_{PasswordMin}")
            .MaximumLength(PasswordMax).WithMessage($"PASSWORD_MAX_LENGTH_{PasswordMax}")
            .Matches("[A-Z]").WithMessage("PASSWORD_UPPERCASE_REQUIRED")
            .Matches("[a-z]").WithMessage("PASSWORD_LOWERCASE_REQUIRED")
            .Matches("[0-9]").WithMessage("PASSWORD_DIGIT_REQUIRED");

    public static IRuleBuilderOptions<T, string> Email<T>(this IRuleBuilder<T, string> rule) =>
        rule
            .NotEmpty().WithMessage("EMAIL_REQUIRED")
            .MaximumLength(EmailMax).WithMessage($"EMAIL_MAX_LENGTH_{EmailMax}")
            .EmailAddress().WithMessage("EMAIL_INVALID_FORMAT");

    public static IRuleBuilderOptions<T, string> Locale<T>(this IRuleBuilder<T, string> rule) =>
        rule
            .NotEmpty().WithMessage("LOCALE_REQUIRED")
            .Must(l => SupportedLocales.Contains(l)).WithMessage("LOCALE_NOT_SUPPORTED");
}