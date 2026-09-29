using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI.Options;

public static class Connection
{
    public static IServiceCollection AddConnectionOptions(this IServiceCollection container,
        IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Core.Options.Connection>, Validators.Options.Connection>();

        container.AddOptions<Core.Options.Connection>()
            .Bind(configuration.GetSection("Connection"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}