using dotenv.net;
using Scalar.AspNetCore;
using zed31rus.Apps.Authorization.Core.Extensions.DI;

namespace zed31rus.Apps.Authorization.Clients.Web.External;

public static class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCore();
        builder.Services.AddOpenApi();
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            DotEnv.Load();
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.Run();
    }
}