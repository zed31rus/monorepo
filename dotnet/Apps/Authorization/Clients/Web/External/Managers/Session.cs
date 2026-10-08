using Microsoft.Extensions.Options;
using zed31rus.Apps.Authorization.Clients.Web.External.Attributes;
using Options = zed31rus.Apps.Authorization.Clients.Web.External.Options;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Managers;

public interface ISession
{
    ISend Send { get; }
    IDelete Delete { get; }
}

public interface ISend
{
    void Session(HttpResponse response, Core.Managers.SessionReturn session);
    void Access(HttpResponse response, Core.Managers.JwtTokenInfo jwtInfo);
    void Refresh(HttpResponse response, Core.Managers.RefreshTokenInfo refreshInfo);
}

public interface IDelete
{
    void Session(HttpResponse response);
    void Access(HttpResponse response);
    void Refresh(HttpResponse response);
}

[Manager]
internal class Session(IOptions<Options.SessionOptions> sessionsOptions) : ISession
{
    public ISend Send { get; } = new Send(sessionsOptions);
    public IDelete Delete { get; } = new Delete(sessionsOptions);
}

internal class Send(IOptions<Options.SessionOptions> sessionsOptions) : ISend
{
    public void Session(HttpResponse response, Core.Managers.SessionReturn session)
    {
        Refresh(response, session.Refresh);
        Access(response, session.Access);
    }

    public void Access(HttpResponse response, Core.Managers.JwtTokenInfo jwtInfo)
    {
        response.Cookies.Append(sessionsOptions.Value.Cookies.Access.Name, jwtInfo.Token,
            sessionsOptions.Value.Cookies.Access.Options);
    }

    public void Refresh(HttpResponse response, Core.Managers.RefreshTokenInfo refreshInfo)
    {
        response.Cookies.Append(sessionsOptions.Value.Cookies.Refresh.Name, refreshInfo.Token,
            sessionsOptions.Value.Cookies.Refresh.Options);
    }
}

internal class Delete(IOptions<Options.SessionOptions> sessionsOptions) : IDelete
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