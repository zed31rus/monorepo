using System.Reflection;
using Authorization.Web.Servers.Base;

namespace authorization.Web.Servers.DI;

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
            .Where(t => t.IsClass && !t.IsAbstract)
            .Where(t => t.GetCustomAttribute<ServerAttribute>() != null).Where(t => t.IsSubclassOf(typeof(BaseServer)));

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