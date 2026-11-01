using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Core.Extensions.Getters;
using zed31rus.Apps.Authorization.Core.Services;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Controllers;

public record UpdateNicknameRequest(string Nickname);
public record UpdateEmailFindRequest(bool AllowEmailFind);
public record UpdateLoginFindRequest(bool AllowLoginFind);


[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class MeController(IMeService service) : ControllerBase
{
    [HttpGet("get")]
    [Authorize(Policy = "me")]
    public async Task<ActionResult<PersonalUser>> Get(CancellationToken ct)
    {
        var publicUser = User.GetPublicUser();
        var user = await service.Get(publicUser.Uuid, ct);
        return user;
    }
    
    [HttpPatch ("update/nickname")]
    [Authorize(Policy = "me")]
    public async Task<ActionResult<PersonalUser>> UpdateNickname(UpdateNicknameRequest req, CancellationToken ct)
    {
        var publicUser = User.GetPublicUser();
        var user = await service.UpdateNickname(req.Nickname, publicUser.Uuid, ct);
        return user;
    }
    
    [HttpPatch ("update/email-find")]
    [Authorize(Policy = "me")]
    public async Task<ActionResult<PersonalUser>> UpdateEmailFind(UpdateEmailFindRequest req, CancellationToken ct)
    {
        var publicUser = User.GetPublicUser();
        var user = await service.UpdateEmailFind(req.AllowEmailFind, publicUser.Uuid, ct);
        return user;
    }
    
    [HttpPatch ("update/login-find")]
    [Authorize(Policy = "me")]
    public async Task<ActionResult<PersonalUser>> UpdateLoginFind(UpdateLoginFindRequest req, CancellationToken ct)
    {
        var publicUser = User.GetPublicUser();
        var user = await service.UpdateLoginFind(req.AllowLoginFind, publicUser.Uuid, ct);
        return user;
    }
}