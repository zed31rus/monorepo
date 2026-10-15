using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Clients.External.Web.Managers;
using zed31rus.Apps.Authorization.Core.Services;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Controllers;

public record RegisterRequest(string Login, string Nickname, string Password, string Email, string Locale);

public record LoginRequest(string Login, string Password);

[ApiController]
[Route("[controller]")]
public class AuthController(IAuthService authService, ISessionManager sessionManager) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<PublicUser>> Register(RegisterRequest req, CancellationToken ct)
    {
        var user = await authService.Register(req.Login, req.Nickname, req.Password, req.Email, req.Locale, ct);
        return StatusCode(StatusCodes.Status201Created, user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<PersonalUser>> Login(LoginRequest req, CancellationToken ct)
    {
        var loginReturn = await authService.Login(req.Login, req.Password, ct);
        var user = loginReturn.User;
        var session = loginReturn.CoreSessionManagerSession;
        sessionManager.Send.Session(Response, session);
        return StatusCode(StatusCodes.Status200OK, user);
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<PersonalUser>> Refresh(CancellationToken ct)
    {
        if (!Request.Cookies.TryGetValue("refresh", out var incomingRefreshToken) ||
            string.IsNullOrEmpty(incomingRefreshToken)) return Unauthorized();

        var refreshReturn = await authService.Refresh(incomingRefreshToken, ct);
        var user = refreshReturn.User;
        var session = refreshReturn.CoreSessionManagerSession;
        sessionManager.Send.Session(Response, session);
        return StatusCode(StatusCodes.Status200OK, user);
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout(CancellationToken ct)
    {
        if (!Request.Cookies.TryGetValue("refresh", out var incomingRefreshToken) ||
            string.IsNullOrEmpty(incomingRefreshToken)) return Unauthorized();

        await authService.Logout(incomingRefreshToken, ct);
        sessionManager.Delete.Session(Response);
        return StatusCode(StatusCodes.Status200OK);
    }
}