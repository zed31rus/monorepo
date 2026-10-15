using FluentValidation;
using zed31rus.Apps.Authorization.Clients.External.Web.Options;
using zed31rus.Apps.Authorization.Clients.External.Web.Validators;
using zed31rus.Packages.Libs.DI.Extensions;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Extensions.DI.Options;

public static class Session
{
    public static IServiceCollection AddSessionOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<SessionOption>, SessionOptionsValidator>();

        container.AddOptions<SessionOption>()
            .Bind(configuration.GetSection("Session"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}