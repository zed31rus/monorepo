using Microsoft.Extensions.Options;
using zed31rus.Apps.Authorization.Clients.Web.External.Attributes;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Managers;

public interface ISession
{
    ISend Send { get; }
    IDelete Delete { get; }
}

public interface ISend
{
    void SendSession(HttpResponse response, Core.Managers.SessionReturn session);
    void SendAccess(HttpResponse response, Core.Managers.JwtTokenInfo jwtInfo);
    void SendRefresh(HttpResponse response, Core.Managers.RefreshTokenInfo refreshInfo);
}

public interface IDelete
{
    void Session(HttpResponse response);
    void Access(HttpResponse response);
    void Refresh(HttpResponse response);
}

[Manager]
public class Session(IOptions<Options.Session> sessionsOptions) : ISession
{
    public ISend Send { get; } = new Send(sessionsOptions);
    public IDelete Delete { get; } = new Delete(sessionsOptions);
}

public class Send(IOptions<Options.Session> sessionsOptions) : ISend
{
    public void SendSession(HttpResponse response, Core.Managers.SessionReturn session)
    {
        SendRefresh(response, session.Refresh);
        SendAccess(response, session.Access);
    }

    public void SendAccess(HttpResponse response, Core.Managers.JwtTokenInfo jwtInfo)
    {
        response.Cookies.Append(sessionsOptions.Value.cookies.access.name, jwtInfo.Token,
            sessionsOptions.Value.cookies.access.options);
    }

    public void SendRefresh(HttpResponse response, Core.Managers.RefreshTokenInfo refreshInfo)
    {
        response.Cookies.Append(sessionsOptions.Value.cookies.refresh.name, refreshInfo.Token,
            sessionsOptions.Value.cookies.refresh.options);
    }
}

public class Delete(IOptions<Options.Session> sessionsOptions) : IDelete
{
    public void Session(HttpResponse response)
    {
        Refresh(response);
        Access(response);
    }

    public void Access(HttpResponse response)
    {
        response.Cookies.Delete(sessionsOptions.Value.cookies.access.name,
            sessionsOptions.Value.cookies.access.options);
    }

    public void Refresh(HttpResponse response)
    {
        response.Cookies.Delete(sessionsOptions.Value.cookies.refresh.name,
            sessionsOptions.Value.cookies.refresh.options);
    }
}