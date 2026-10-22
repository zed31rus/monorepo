using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.DI.Extensions;
using zed31rus.Packages.Libs.DI.Extensions.Generic;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI.Options;

internal static class AuthOptionDiExtension
{
    public static IServiceCollection AddAuthOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Core.Options.AuthOption>, Validators.Options.AuthOptionValidator>();

        container.AddOptions<Core.Options.AuthOption>()
            .Bind(configuration.GetSection("Auth"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}