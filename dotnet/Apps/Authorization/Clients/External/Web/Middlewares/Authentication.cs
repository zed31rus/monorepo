using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class AuthenticationMiddleware
{
    public static IServiceCollection AddAuthenticationMiddleware(this IServiceCollection container)
    {
        container.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => { });

        return container;
    }
}