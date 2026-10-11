using dotenv.net;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Scalar.AspNetCore;
using zed31rus.Apps.Authorization.Clients.External.Web.Extensions.DI;
using zed31rus.Apps.Authorization.Clients.External.Web.Transformers;
using zed31rus.Apps.Authorization.Clients.Web.External.Extensions.DI;
using zed31rus.Apps.Authorization.Core.Extensions.DI;

namespace zed31rus.Apps.Authorization.Clients.External.Web;

public static class WebExternalClient
{
    public static void Main(string[] args)
    {
        if (IsDevelopment())
        {
            DotEnv.Load(new DotEnvOptions(overwriteExistingVars: false, probeForEnv: true, probeLevelsToSearch: 9));
        }

        var app = CreateApp(args);
    }

    public static WebApplication CreateApp(string[] args, Action<IMvcBuilder>? configureMvc = null)
    {
        var builder = WebApplication.CreateBuilder(args);

        ConfigureServices(builder, configureMvc);

        var app = builder.Build();

        ConfigurePipeline(app);

        return app;
    }

    private static void ConfigureServices(WebApplicationBuilder builder, Action<IMvcBuilder>? configureMvc)
    {
        builder.Services.AddCore(builder.Configuration);
        builder.Services.AddManagers();
        builder.Services.AddOpenApi();

        var mvc = builder.Services.AddControllers(o =>
            o.Conventions.Add(new RouteTokenTransformerConvention(new LowercaseParameterTransformer())));

        configureMvc?.Invoke(mvc);
    }

    private static void ConfigurePipeline(WebApplication app)
    {
        app.MapControllers();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }
    }

    private static bool IsDevelopment()
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        return string.Equals(environment, Environments.Development, StringComparison.OrdinalIgnoreCase);
    }
}