using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Zed31rus.Apps.Authorization.Clients.External.Web.Features.Users;
using Zed31rus.Apps.Authorization.Clients.External.Web.Filters;
using Zed31rus.Apps.Authorization.Clients.External.Web.Managers;
using Zed31rus.Apps.Authorization.Core.Services;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Auth;

public static class AuthController
{
    public static IEndpointRouteBuilder UseAuthController(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup(AuthRoutes.Group);

        group.MapPost(AuthRoutes.Endpoints.Register.Path, Register)
            .WithName(AuthRoutes.Endpoints.Register.Name)
            .AddEndpointFilter<ValidationFilter<AuthDto.Register.Request>>();

        group.MapPost(AuthRoutes.Endpoints.Login.Path, Login)
            .WithName(AuthRoutes.Endpoints.Login.Name)
            .AddEndpointFilter<ValidationFilter<AuthDto.Login.Request>>();

        group.MapPost(AuthRoutes.Endpoints.Refresh.Path, Refresh)
            .WithName(AuthRoutes.Endpoints.Refresh.Name);

        group.MapPost(AuthRoutes.Endpoints.Logout.Path, Logout)
            .WithName(AuthRoutes.Endpoints.Logout.Name);

        return app;
    }
    
    public static async Task<Created<AuthDto.Register.Response>> Register([FromBody]AuthDto.Register.Request req, IAuthService authService, LinkGenerator linkGenerator, CancellationToken ct)
    {
        var user = await authService.Register(req.Login, req.Nickname, req.Password, req.Email, req.Locale, ct);
        var location = linkGenerator.GetPathByName(UsersRoutes.Endpoints.GetByUuid.Name, values: new { Uuid = user.Uuid });

        return TypedResults.Created(location, new AuthDto.Register.Response(user));
    }
    
    public static async Task<Ok<AuthDto.Login.Response>> Login([FromBody]AuthDto.Login.Request req, IAuthService authService, ISessionManager sessionManager, HttpResponse response, CancellationToken ct)
    {
        var loginReturn = await authService.Login(req.Login, req.Password, ct);
        var user = loginReturn.User;
        var session = loginReturn.Session;
        sessionManager.Send.Refresh(response, session.Refresh);
        return TypedResults.Ok(new AuthDto.Login.Response(user, session.Access.Token, session.Access.Expires.At));
    }
    
    public static async Task<Ok<AuthDto.Refresh.Response>> Refresh(IAuthService authService, ISessionManager sessionManager, HttpRequest request, HttpResponse response, CancellationToken ct)
    {
        var incomingRefreshToken = sessionManager.Get.Refresh(request);

        var refreshReturn = await authService.Refresh(incomingRefreshToken, ct);
        var user = refreshReturn.User;
        var session = refreshReturn.Session;
        sessionManager.Send.Refresh(response, session.Refresh);
        return TypedResults.Ok(new AuthDto.Refresh.Response(user, session.Access.Token, session.Access.Expires.At));
    }
    public static async Task<Ok> Logout(IAuthService authService, ISessionManager sessionManager, HttpRequest request, HttpResponse response, CancellationToken ct)
    {
        var incomingRefreshToken = sessionManager.Get.Refresh(request);

        await authService.Logout(incomingRefreshToken, ct);
        sessionManager.Delete.Session(response);
        return TypedResults.Ok();
    }
}