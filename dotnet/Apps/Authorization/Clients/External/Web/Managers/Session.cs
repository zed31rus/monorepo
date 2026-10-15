using Microsoft.Extensions.Options;
using zed31rus.Apps.Authorization.Clients.External.Web.Attributes;

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
internal class SessionManagerManager(IOptions<Options.SessionOption> sessionsOptions) : ISessionManager
{
    public ISend Send { get; } = new Send(sessionsOptions);
    public IDelete Delete { get; } = new Delete(sessionsOptions);
}

internal class Send(IOptions<Options.SessionOption> sessionsOptions) : ISend
{
    public void Session(HttpResponse response, Core.Managers.CoreSessionManagerSessionReturn coreSessionManagerSession)
    {
        Refresh(response, coreSessionManagerSession.CoreSessionManagerRefresh);
        Access(response, coreSessionManagerSession.Access);
    }

    public void Access(HttpResponse response, Core.Managers.CoreSessionManagerJwtTokenInfo coreSessionManagerJwtInfo)
    {
        response.Cookies.Append(sessionsOptions.Value.Cookies.Access.Name, coreSessionManagerJwtInfo.Token,
            sessionsOptions.Value.Cookies.Access.Options);
    }

    public void Refresh(HttpResponse response, Core.Managers.CoreSessionManagerRefreshTokenInfo coreSessionManagerRefreshInfo)
    {
        response.Cookies.Append(sessionsOptions.Value.Cookies.Refresh.Name, coreSessionManagerRefreshInfo.Token,
            sessionsOptions.Value.Cookies.Refresh.Options);
    }
}

internal class Delete(IOptions<Options.SessionOption> sessionsOptions) : IDelete
{
    public void Session(HttpResponse response)
    {
        Refresh(response);
        Access(response);
    }

    public void Access(HttpResponse response)
    {
        response.Cookies.Delete(sessionsOptions.Value.Cookies.Access.Name,
            sessionsOptions.Value.Cookies.Access.Options);
    }

    public void Refresh(HttpResponse response)
    {
        response.Cookies.Delete(sessionsOptions.Value.Cookies.Refresh.Name,
            sessionsOptions.Value.Cookies.Refresh.Options);
    }
}