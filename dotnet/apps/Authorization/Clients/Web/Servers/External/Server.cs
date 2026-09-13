using Authorization.Clients.Web.Extensions;
using Authorization.Clients.Web.Servers.Base;
using Authorization.Clients.Web.Servers.DI;
using Authorization.Clients.Web.Servers.External.DI;

namespace Authorization.Clients.Web.Servers.External;

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