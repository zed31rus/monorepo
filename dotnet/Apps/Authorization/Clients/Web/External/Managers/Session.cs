using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Managers;

public class Session(IOptions<Options.Session> sessionsOptions)
{
    public void SendSession(HttpResponse responce, Core.Managers.SessionReturn session)
    {

    }

    public void SendAccess(HttpResponse responce, Core.Managers.JwtTokenInfo jwtInfo)
    {
        responce.Cookies.Append(sessionsOptions.Value.cookies.access.name, jwtInfo.Token,
            sessionsOptions.Value.cookies.access.options);
    }

    public void SendRefresh(HttpResponse responce, Core.Managers.RefreshTokenInfo refreshInfo)
    {
        responce.Cookies.Append(sessionsOptions.Value.cookies.refresh.name, refreshInfo.Token, sessionsOptions.Value.cookies.refresh.options);
    }
}