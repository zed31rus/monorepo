namespace Authorization.Clients.Web.Servers.Base;

public abstract class BaseServer
{
    public abstract Task Listen(string[] args);
}