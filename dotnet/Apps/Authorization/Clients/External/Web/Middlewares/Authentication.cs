using Microsoft.AspNetCore.Authentication.JwtBearer;
using zed31rus.Options.Options;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class AuthenticationMiddleware
{
    public static IServiceCollection AddAuthenticationMiddleware(this IServiceCollection container)
    {
        container.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();
        
        container.AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme).Configure<IJwtOption>((options, jwtOption) =>
        {
            options.TokenValidationParameters = jwtOption.TokenValidationOption;
        });

        return container;
    }
}