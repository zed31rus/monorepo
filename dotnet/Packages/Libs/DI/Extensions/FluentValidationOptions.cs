using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

namespace zed31rus.Packages.Libs.DI.Extensions;

public static class FluentValidationOptions
{
    public static OptionsBuilder<TOptions> ValidateWithFluent<TOptions>(
        this OptionsBuilder<TOptions> builder)
        where TOptions : class
    {
        builder.Services.AddSingleton<Options.Adapters.IFluentValidationOptions<TOptions>>(serviceProvider =>
        {
            var validator = serviceProvider.GetRequiredService<IValidator<TOptions>>();
            return new Options.Adapters.FluentValidationOptions<TOptions>(validator);
        });

        builder.Services.AddSingleton<IValidateOptions<TOptions>>(serviceProvider =>
            serviceProvider.GetRequiredService<Options.Adapters.IFluentValidationOptions<TOptions>>());

        return builder;
    }
}