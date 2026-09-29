using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI.Options;

public static class Jwt
{
    public static IServiceCollection AddJwtOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Core.Options.Jwt>, Validators.Options.Jwt>();

        container.AddOptions<Core.Options.Jwt>()
            .Bind(configuration.GetSection("Jwt"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}