using authorization.Web.Servers.DI;

namespace Authorization;

public class Program
{
    public static async Task Main(string[] args)
    {
        await Servers.Run(args);
    }
}