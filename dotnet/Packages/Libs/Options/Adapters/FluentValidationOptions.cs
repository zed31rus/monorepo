using System.Linq;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace zed31rus.Packages.Libs.Options.Adapters;

public interface IFluentValidationOptions<TOptions> : IValidateOptions<TOptions>
    where TOptions : class
{
}

public class FluentValidationOptions<TOptions>(IValidator<TOptions> validator) : IFluentValidationOptions<TOptions>
    where TOptions : class
{
    public ValidateOptionsResult Validate(string? name, TOptions options)
    {
        var result = validator.Validate(options);

        return result.IsValid
            ? ValidateOptionsResult.Success
            : ValidateOptionsResult.Fail(result.Errors.Select(e => e.ErrorMessage));
    }
}