using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Core.Permissions;
using zed31rus.Apps.Authorization.Core.Services;
using zed31rus.Packages.Db.Auth.Dto.User;
using zed31rus.Packages.Db.Auth.Models;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
[ProducesResponseType<PublicUser>(StatusCodes.Status200OK)]
[ProducesResponseType<ProblemDetails>(StatusCodes.Status404NotFound)]
public class UsersController(IUsersService usersService) : ControllerBase
{
    [HttpGet("get/uuid")]
    [Authorize(Policy = "get-users")]
    public async Task<ActionResult<PublicUser>> GetByUuid([FromQuery] Guid uuid, CancellationToken ct)
    {
        var user = await usersService.GetByUuid(uuid, ct);
        return user;
    }
    
    [HttpGet("get/login")]
    [Authorize(Policy = "get-users")]
    public async Task<ActionResult<PublicUser>> GetByLogin([FromQuery] string login, CancellationToken ct)
    {
        var user = await usersService.GetByLogin(login, ct);
        return user;
    }
    
    [HttpGet("get/email")]
    [Authorize(Policy = "get-users")]
    public async Task<ActionResult<PublicUser>> GetByEmail([FromQuery] string email, CancellationToken ct)
    {
        var user = await usersService.GetByEmail(email, ct);
        return user;
    }
    
    [HttpGet("get/nickname")]
    [Authorize(Policy = "get-users")]
    public async Task<ActionResult<PublicUser>> GetByNickName([FromQuery] string nickname, CancellationToken ct)
    {
        var user = await usersService.GetByNickname(nickname, ct);
        return user;
    }
}