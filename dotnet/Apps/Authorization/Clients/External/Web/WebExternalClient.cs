using Microsoft.AspNetCore.HttpLogging;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Scalar.AspNetCore;
using Zed31rus.Apps.Authorization.Clients.External.Web.Extensions.DI;
using Zed31rus.Apps.Authorization.Clients.External.Web.Handlers;
using Zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;
using Zed31rus.Apps.Authorization.Clients.External.Web.Transformers;
using Zed31rus.Apps.Authorization.Core.Extensions.DI;
using Zed31rus.Options.Auth.Extensions.DI;
using Zed31rus.Options.Global.Extensions.DI;
using Zed31rus.Packages.Infra.Extensions.DI;

namespace Zed31rus.Apps.Authorization.Clients.External.Web;

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
        builder.Services.AddGlobalOptions();
        builder.Services.AddAppOptions();
        builder.Services.AddInfra();
        builder.Services.AddAuthCore();
        builder.Services.AddManagers();
        builder.Services.AddOpenApi(options =>
        {
            options.AddDocumentTransformer<BearerSecurityTransformer>();
            options.AddOperationTransformer<ErrorResponsesTransformer>();
        });
        builder.Services.AddExceptionHandler<AppExceptionHandler>();
        if (!builder.Environment.IsProduction())
        {
            builder.Services.AddDevCorsPolicy();
        }
        else
        {
            builder.Services.AddMainCorsPolicy();
        }

        builder.Services.AddProblemDetails();
        builder.Services.AddAuthenticationMiddleware();
        builder.Services.AddRateLimiters();
        builder.Services.AddAuthorizationMiddleware();

        var mvc = builder.Services.AddControllers(o =>
            o.Conventions.Add(new RouteTokenTransformerConvention(new LowercaseParameterTransformer())));
        builder.Services.AddHttpLogging(o => { o.LoggingFields = HttpLoggingFields.RequestPropertiesAndHeaders | HttpLoggingFields.ResponsePropertiesAndHeaders; });
        configureMvc?.Invoke(mvc);
    }

    private static void ConfigurePipeline(WebApplication app)
    {
        app.UseExceptionHandler();
        app.UseHttpLogging();

        if (!app.Environment.IsProduction())
        {
            app.UseCors(CorsAppMiddleware.PolicyNames.Dev);
        }
        else
        {
            app.UseCors(CorsAppMiddleware.PolicyNames.Main);
        }

        app.UseAuthentication();
        app.UseRateLimiter();
        app.UseAuthorization();

        app.MapControllers().RequireRateLimiting(RateLimiterAppMiddleware.PolicyNames.Default);

        if (!app.Environment.IsProduction())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }
    }
}