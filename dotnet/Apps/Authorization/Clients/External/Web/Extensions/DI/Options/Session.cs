using FluentValidation;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Extensions.DI.Options;

public static class Session
{
    public static IServiceCollection AddSessionOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<External.Options.SessionOptions>, Validators.SessionOptionsValidator>();

        container.AddOptions<External.Options.SessionOptions>()
            .Bind(configuration.GetSection("Session"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}