using System.Reflection;
using Authorization.Clients.Web.Servers.Base;

namespace Authorization.Clients.Web.Servers.DI;

[AttributeUsage(AttributeTargets.Class)]
public class ServerAttribute : Attribute
{
}

public static class Servers
{
    public static async Task Run(string[] args)
    {
        var assembly = Assembly.GetExecutingAssembly();

        var serverTypes = assembly.GetTypes()
            .Where(type =>
                type is { IsClass: true, IsAbstract: false } &&
                typeof(BaseServer).IsAssignableFrom(type) &&
                type.GetCustomAttribute<ServerAttribute>() is not null);

        var tasks = new List<Task>();

        foreach (var type in serverTypes)
        {
            var instance = (BaseServer)Activator.CreateInstance(type)!;
            var task = instance.Listen(args);
            tasks.Add(task);
        }

        await Task.WhenAll(tasks);
    }
}