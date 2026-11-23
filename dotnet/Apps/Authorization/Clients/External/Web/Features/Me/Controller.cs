using System.Security.Claims;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Zed31rus.Apps.Authorization.Clients.External.Web.Filters;
using Zed31rus.Apps.Authorization.Core.Extensions.Getters;
using Zed31rus.Apps.Authorization.Core.Permissions;
using Zed31rus.Apps.Authorization.Core.Services;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Me;

public static class MeController
{
    public static IEndpointRouteBuilder UseMeController(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup(MeRoutes.Group)
            .RequireAuthorization(app.ServiceProvider.GetRequiredService<IMePermission>().Name);

        group.MapGet(MeRoutes.Endpoints.Get.Path, Get);

        group.MapPatch(MeRoutes.Endpoints.UpdateEmailFind.Path, UpdateEmailFind)
            .AddEndpointFilter<ValidationFilter<MeDto.UpdateEmailFind.Request>>();

        group.MapPatch(MeRoutes.Endpoints.UpdateLoginFind.Path, UpdateLoginFind);

        group.MapPatch(MeRoutes.Endpoints.UpdateNickname.Path, UpdateNickname);

        return app;
    }
    
    public static async Task<Ok<MeDto.Get.Response>> Get(IMeService service, ClaimsPrincipal requestUser, CancellationToken ct)
    {
        var publicUser = requestUser.GetPublicUser();
        var user = await service.Get(publicUser.Uuid, ct);
        return TypedResults.Ok(new MeDto.Get.Response(user));
    }

    public static async Task<Ok<MeDto.UpdateNickname.Response>> UpdateNickname([FromBody]MeDto.UpdateNickname.Request req, IMeService service, ClaimsPrincipal requestUser,  CancellationToken ct)
    {
        var publicUser = requestUser.GetPublicUser();
        var user = await service.UpdateNickname(req.Nickname, publicUser.Uuid, ct);
        return TypedResults.Ok(new MeDto.UpdateNickname.Response(user));
    }

    public static async Task<Ok<MeDto.UpdateEmailFind.Response>> UpdateEmailFind([FromBody]MeDto.UpdateEmailFind.Request req, IMeService service, ClaimsPrincipal requestUser,  CancellationToken ct)
    {
        var publicUser = requestUser.GetPublicUser();
        var user = await service.UpdateEmailFind(req.AllowEmailFind, publicUser.Uuid, ct);
        return TypedResults.Ok(new MeDto.UpdateEmailFind.Response(user));
    }

    public static async Task<Ok<MeDto.UpdateLoginFind.Response>> UpdateLoginFind([FromBody]MeDto.UpdateLoginFind.Request req, IMeService service, ClaimsPrincipal requestUser,  CancellationToken ct)
    {
        var publicUser = requestUser.GetPublicUser();
        var user = await service.UpdateLoginFind(req.AllowLoginFind, publicUser.Uuid, ct);
        return TypedResults.Ok(new MeDto.UpdateLoginFind.Response(user));
    }
}