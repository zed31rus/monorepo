using dotenv.net;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Scalar.AspNetCore;
using zed31rus.Apps.Authorization.Clients.Web.External.Transformers;
using zed31rus.Apps.Authorization.Core.Extensions.DI;

namespace zed31rus.Apps.Authorization.Clients.Web.External;

public static class Program
{
    private static void Main(string[] args)
    {
        if (IsDevelopment())
            DotEnv.Load(new DotEnvOptions(overwriteExistingVars: false, probeForEnv: true, probeLevelsToSearch: 9));

        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCore(builder.Configuration);
        builder.Services.AddControllers(o =>
            o.Conventions.Add(new RouteTokenTransformerConvention(new LowercaseParameterTransformer())));
        builder.Services.AddOpenApi();

        var app = builder.Build();


        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.MapControllers();

        app.Run();
    }

    private static bool IsDevelopment()
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

        return string.Equals(environment, Environments.Development, StringComparison.OrdinalIgnoreCase);
    }
}