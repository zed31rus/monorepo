using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Core.Services;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Controllers;

public record RegisterRequest(string Login, string Nickname, string Password, string Email, string Locale);

public record LoginRequest(string Login, string Password);

[ApiController]
[Route("[controller]")]
public class Auth(IAuth authService) : ControllerBase
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
        var user = loginReturn.user;
        var session = loginReturn.session;
        var accessToken = session.Access;
        var refreshToken = session.Refresh;
        return StatusCode(StatusCodes.Status200OK, user);
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<PersonalUser>> Refresh(CancellationToken ct)
    {
        if (!Request.Cookies.TryGetValue("refresh", out var refreshToken) ||
            string.IsNullOrEmpty(refreshToken)) return Unauthorized();
    }