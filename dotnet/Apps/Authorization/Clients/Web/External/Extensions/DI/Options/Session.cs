namespace zed31rus.Apps.Authorization.Clients.Web.External.Extensions.DI.Options;

public static class Session
{
    public static IServiceCollection AddJwtOptions(this IServiceCollection container, IConfiguration configuration)
    {
        container.AddSingleton<IValidator<External.Options.SessionOptions>, Validators.S>();

        container.AddOptions<Core.Options.Jwt>()
            .Bind(configuration.GetSection("Jwt"))
            .ValidateWithFluent()
            .ValidateOnStart();

        return container;
    }
}