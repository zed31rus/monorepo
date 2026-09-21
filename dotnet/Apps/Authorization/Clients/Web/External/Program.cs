using dotenv.net;

namespace zed31rus.Apps.Authorization.Clients.Web.External
{
    public static class Program
    {
         static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddOpenApi();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                DotEnv.Load();
                app.MapOpenApi();
            }
            
            app.Run();
        }
    }
}


