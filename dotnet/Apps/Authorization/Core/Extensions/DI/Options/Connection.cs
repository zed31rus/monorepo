using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI.Options;

internal static class ConnectionOptionDiExtension
{
    public static IServiceCollection AddConnectionOptions(this IServiceCollection container,
        IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Core.Options.ConnectionOption>, Validators.Options.ConnectionOptionValidator>();

        container.AddOptions<Core.Options.ConnectionOption>()
            .Bind(configuration.GetSection("Connection"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}