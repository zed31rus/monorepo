using Microsoft.AspNetCore.Http.HttpResults;
using Zed31rus.Apps.Authorization.Clients.External.Web.Filters;
using Zed31rus.Apps.Authorization.Core.Permissions;
using Zed31rus.Apps.Authorization.Core.Services;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;

public static class UsersController
{
    public static IEndpointRouteBuilder UseUsersController(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup(UsersRoutes.Group)
            .RequireAuthorization(app.ServiceProvider.GetRequiredService<IGetUsersPermission>().Name)
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapGet(UsersRoutes.Endpoints.GetByUuid.Path, GetByUuid)
            .WithName(UsersRoutes.Endpoints.GetByUuid.Name)
            .AddEndpointFilter<ValidationFilter<UsersDto.GetByUuid.Request>>();

        group.MapGet(UsersRoutes.Endpoints.GetByEmail.Path, GetByEmail)
            .WithName(UsersRoutes.Endpoints.GetByEmail.Name)
            .AddEndpointFilter<ValidationFilter<UsersDto.GetByEmail.Request>>();

        group.MapGet(UsersRoutes.Endpoints.GetByLogin.Path, GetByLogin)
            .WithName(UsersRoutes.Endpoints.GetByLogin.Name)
            .AddEndpointFilter<ValidationFilter<UsersDto.GetByLogin.Request>>();

        group.MapGet(UsersRoutes.Endpoints.GetByNickName.Path, GetByNickName)
            .WithName(UsersRoutes.Endpoints.GetByNickName.Name)
            .AddEndpointFilter<ValidationFilter<UsersDto.GetByNickName.Request>>();

        return app;
    }

    public static async Task<Ok<UsersDto.GetByUuid.Response>> GetByUuid([AsParameters]UsersDto.GetByUuid.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByUuid(req.Uuid, ct);
        return TypedResults.Ok(new UsersDto.GetByUuid.Response(user));
    }

    public static async Task<Ok<UsersDto.GetByLogin.Response>> GetByLogin([AsParameters]UsersDto.GetByLogin.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByLogin(req.Login, ct);
        return TypedResults.Ok(new UsersDto.GetByLogin.Response(user));
    }
    
    public static async Task<Ok<UsersDto.GetByEmail.Response>> GetByEmail([AsParameters]UsersDto.GetByEmail.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByEmail(req.Email, ct);
        return TypedResults.Ok(new UsersDto.GetByEmail.Response(user));
    }

    public static async Task<Ok<UsersDto.GetByNickName.Response>> GetByNickName([AsParameters] UsersDto.GetByNickName.Request req, IUsersService usersService, CancellationToken ct)
    {
        var user = await usersService.GetByNickName(req.NickName, ct);
        return TypedResults.Ok(new UsersDto.GetByNickName.Response(user));
    }
}