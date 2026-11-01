using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Clients.External.Web.Managers;
using zed31rus.Apps.Authorization.Core.Services;
using zed31rus.Packages.Db.Auth.Dto.User;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Controllers;

public record RegisterRequest(string Login, string Nickname, string Password, string Email, string Locale);

public record LoginRequest(string Login, string Password);

public record LoginResponse(PersonalUser User, string AccessToken, DateTime AccessTokenExpiresAt);
public record RefreshResponse(PersonalUser User, string AccessToken, DateTime AccessTokenExpiresAt);

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
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest req, CancellationToken ct)
    {
        var loginReturn = await authService.Login(req.Login, req.Password, ct);
        var user = loginReturn.User;
        var session = loginReturn.Session;
        sessionManager.Send.Refresh(Response, session.Refresh);
        return StatusCode(StatusCodes.Status200OK, new LoginResponse(user, session.Access.Token, session.Access.Expires.AtTime));
    }

    [HttpPost("refresh")]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<RefreshResponse>> Refresh(CancellationToken ct)
    {
        var incomingRefreshToken = sessionManager.Get.Refresh(Request);

        var refreshReturn = await authService.Refresh(incomingRefreshToken, ct);
        var user = refreshReturn.User;
        var session = refreshReturn.Session;
        sessionManager.Send.Refresh(Response, session.Refresh);
        return StatusCode(StatusCodes.Status200OK, new RefreshResponse(user, session.Access.Token, session.Access.Expires.AtTime));
    }

    [HttpPost("logout")]
    public async Task<ActionResult> Logout(CancellationToken ct)
    {
        var incomingRefreshToken = sessionManager.Get.Refresh(Request);

        await authService.Logout(incomingRefreshToken, ct);
        sessionManager.Delete.Session(Response);
        return StatusCode(StatusCodes.Status200OK);
    }
}