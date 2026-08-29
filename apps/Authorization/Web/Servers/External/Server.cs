using Authorization.Web.Extensions;
using Authorization.Web.Servers.Base;
using authorization.Web.Servers.DI;
using Authorization.Web.Servers.External.DI;

namespace Authorization.Web.Servers.External;

[Server]
public class Server : BaseServer
{
    public override Task Listen(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.InjectServices();
        builder.Services.AddControllers();
        builder.Services.AddOpenApi();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
            app.UseDevelopment();

        app.UseAuthorization();

        app.MapControllers();

        return app.RunAsync();
    }
}