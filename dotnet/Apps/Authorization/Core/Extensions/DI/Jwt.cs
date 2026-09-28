using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI;

public static class Jwt
{
    public static IServiceCollection AddJwtOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Options.Jwt>, Validators.Jwt>();

        container.AddOptions<Options.Jwt>()
            .Bind(configuration.GetSection("JWT"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}