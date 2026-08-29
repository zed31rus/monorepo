namespace Authorization.Web.Servers.External.DI;

public static class Servers
{
    public static void Inject(this IServiceCollection servers)
    {
        servers.AddScoped<>();
    }
}