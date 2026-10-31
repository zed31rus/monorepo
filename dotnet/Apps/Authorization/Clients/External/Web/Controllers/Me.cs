using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Core.Services;
using zed31rus.Packages.Db.Auth;
using zed31rus.Packages.Db.Auth.Dto.User;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Controllers;


[ApiController]
[Route("[controller]")]
public class MeController(IMeService service) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<PersonalUser>> Get(CancellationToken ct)
    {
        var user = service.Get(User.);
    }
}