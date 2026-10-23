using zed31rus.Apps.Authorization.Clients.External.Web.Attributes;
using zed31rus.Options.Options;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Managers;

public interface ISessionManager
{
    ISend Send { get; }
    IDelete Delete { get; }
}

public interface ISend
{
    void Session(HttpResponse response, Core.Managers.CoreSessionManagerSessionReturn coreSessionManagerSession);
    void Access(HttpResponse response, Core.Managers.CoreSessionManagerJwtTokenInfo coreSessionManagerJwtInfo);
    void Refresh(HttpResponse response, Core.Managers.CoreSessionManagerRefreshTokenInfo coreSessionManagerRefreshInfo);
}

public interface IDelete
{
    void Session(HttpResponse response);
    void Access(HttpResponse response);
    void Refresh(HttpResponse response);
}

[Manager]
internal class SessionManager(ISessionOption sessionsOptions) : ISessionManager
{
    public ISend Send { get; } = new Send(sessionsOptions);
    public IDelete Delete { get; } = new Delete(sessionsOptions);
}

internal class Send(ISessionOption sessionsOptions) : ISend
{
    public void Session(HttpResponse response, Core.Managers.CoreSessionManagerSessionReturn coreSessionManagerSession)
    {
        Refresh(response, coreSessionManagerSession.CoreSessionManagerRefresh);
        Access(response, coreSessionManagerSession.Access);
    }

    public void Access(HttpResponse response, Core.Managers.CoreSessionManagerJwtTokenInfo coreSessionManagerJwtInfo)
    {
        response.Cookies.Append(sessionsOptions.Cookies.Access.Name, coreSessionManagerJwtInfo.Token,
            sessionsOptions.Cookies.Access.Options);
    }

    public void Refresh(HttpResponse response, Core.Managers.CoreSessionManagerRefreshTokenInfo coreSessionManagerRefreshInfo)
    {
        response.Cookies.Append(sessionsOptions.Cookies.Refresh.Name, coreSessionManagerRefreshInfo.Token,
            sessionsOptions.Cookies.Refresh.Options);
    }
}

internal class Delete(ISessionOption sessionsOptions) : IDelete
{
    public void Session(HttpResponse response)
    {
        Refresh(response);
        Access(response);
    }

    public void Access(HttpResponse response)
    {
        response.Cookies.Delete(sessionsOptions.Cookies.Access.Name,
            sessionsOptions.Cookies.Access.Options);
    }

    public void Refresh(HttpResponse response)
    {
        response.Cookies.Delete(sessionsOptions.Cookies.Refresh.Name,
            sessionsOptions.Cookies.Refresh.Options);
    }
}