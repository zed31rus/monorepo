using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Core.Extensions.DI.Options;

public static class Auth
{
    public static IServiceCollection AddAuthOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Core.Options.Auth>, Validators.Options.Auth>();

        container.AddOptions<Core.Options.Auth>()
            .Bind(configuration.GetSection("Auth"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}