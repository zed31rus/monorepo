using FluentValidation;
using zed31rus.Apps.Authorization.Clients.External.Web.Validators;
using zed31rus.Apps.Authorization.Clients.External.Web.Validators.Options;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Extensions.DI.Options;

public static class Session
{
    public static IServiceCollection AddSessionOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<Clients.External.Web.Options.Session>, SessionOptionsValidator>();

        container.AddOptions<Clients.External.Web.Options.Session>()
            .Bind(configuration.GetSection("Session"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}