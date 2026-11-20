using Microsoft.AspNetCore.Http.HttpResults;
using Zed31rus.Apps.Authorization.Core.Services;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;

public static class UsersController
{
    public static IEndpointRouteBuilder Use(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup(UsersRoutes.Group).RequireAuthorization("get-users").ProducesProblem(StatusCodes.Status404NotFound);

        group.MapGet(UsersRoutes.Paths.GetByUuid, GetByUuid);
        group.MapGet(UsersRoutes.Paths.GetByEmail, GetByEmail);
        group.MapGet(UsersRoutes.Paths.GetByLogin, GetByLogin);
        group.MapGet(UsersRoutes.Paths.GetByNickName, GetByNickName);

        return app;
    }

    public static async Task<Ok<UsersDto.GetByUuid.Response>> GetByUuid([AsParameters] UsersDto.GetByUuid.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByUuid(req.Uuid, ct);
        return TypedResults.Ok(new UsersDto.GetByUuid.Response(user));
    }

    public static async Task<Ok<UsersDto.GetByLogin.Response>> GetByLogin([AsParameters] UsersDto.GetByLogin.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByLogin(req.Login, ct);
        return TypedResults.Ok(new UsersDto.GetByLogin.Response(user));
    }
    
    public static async Task<Ok<UsersDto.GetByEmail.Response>> GetByEmail([AsParameters] UsersDto.GetByEmail.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByEmail(req.Email, ct);
        return TypedResults.Ok(new UsersDto.GetByEmail.Response(user));
    }

    public static async Task<Ok<UsersDto.GetByNickName.Response>> GetByNickName([AsParameters] UsersDto.GetByNickName.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByNickname(req.NickName, ct);
        return TypedResults.Ok(new UsersDto.GetByNickName.Response(user));
    }
}