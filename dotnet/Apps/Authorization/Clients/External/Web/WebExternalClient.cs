using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Scalar.AspNetCore;
using zed31rus.Apps.Authorization.Clients.External.Web.Extensions.DI;
using zed31rus.Apps.Authorization.Clients.External.Web.Handlers;
using zed31rus.Apps.Authorization.Clients.External.Web.Transformers;
using zed31rus.Apps.Authorization.Core.Extensions.DI;
using zed31rus.Options.Extensions.DI;

namespace zed31rus.Apps.Authorization.Clients.External.Web;

public static class WebExternalClient
{
    public static void Main(string[] args)
    {
        var app = CreateApp(args);

        app.Run();
    }

    public static WebApplication CreateApp(string[] args, Action<IMvcBuilder>? configureMvc = null)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Host.UseDefaultServiceProvider((context, options) =>
        {
            options.ValidateOnBuild = true;
            options.ValidateScopes = true;
        });

        ConfigureServices(builder, configureMvc);

        var app = builder.Build();

        ConfigurePipeline(app);

        return app;
    }

    private static void ConfigureServices(WebApplicationBuilder builder, Action<IMvcBuilder>? configureMvc)
    {
        builder.Services.AddAppOptions();
        builder.Services.AddAuthCore();
        builder.Services.AddManagers();
        builder.Services.AddOpenApi();
        //builder.Services.AddRateLimiter(settings => )
        builder.Services.AddExceptionHandler<ErrorHandler>();
        builder.Services.AddProblemDetails();

        var mvc = builder.Services.AddControllers(o =>
            o.Conventions.Add(new RouteTokenTransformerConvention(new LowercaseParameterTransformer())));

        configureMvc?.Invoke(mvc);
    }

    private static void ConfigurePipeline(WebApplication app)
    {
        app.MapControllers();

        if (!IsProduction())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }
        app.UseExceptionHandler();
        app.UseAuthentication();
        app.UseAuthorization();
    }

    private static bool IsDevelopment()
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        return string.Equals(environment, Environments.Development, StringComparison.OrdinalIgnoreCase);
    }

    private static bool IsStaged()
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        return string.Equals(environment, Environments.Staging, StringComparison.OrdinalIgnoreCase);
    }

    private static bool IsProduction()
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        return string.Equals(environment, Environments.Production, StringComparison.OrdinalIgnoreCase);
    }
}