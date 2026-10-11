using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI.Options;

internal static class JwtOptionDiExtension
{
    public static IServiceCollection AddJwtOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Core.Options.JwtOption>, Validators.Options.JwtOptionsValidator>();

        container.AddOptions<Core.Options.JwtOption>()
            .Bind(configuration.GetSection("Jwt"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}