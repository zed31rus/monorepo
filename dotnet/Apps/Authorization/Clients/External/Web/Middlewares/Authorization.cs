using Microsoft.AspNetCore.Authorization;
using zed31rus.Apps.Authorization.Core.Base;
using zed31rus.Apps.Authorization.Core.Extensions.Getters;
using zed31rus.Apps.Authorization.Core.Managers;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class AuthorizationMiddleware
{
    public static IServiceCollection AddAuthorizationMiddleware(this IServiceCollection container)
    {
        container.AddAuthorization();

        container
            .AddOptions<AuthorizationOptions>()
            .Configure<IRoleManager, IEnumerable<BaseRole>>((options, roleManager, roles) =>
            {
                foreach (var role in roles)
                {
                    string requiredRoleName = role.Name;
                    
                    options.AddPolicy(requiredRoleName, policy =>
                    {
                        policy.RequireAuthenticatedUser()
                            .RequireAssertion(context => context.User.GetPublicUser() is { } user &&
                                roleManager.ExpandRole(user.Role).Contains(requiredRoleName));
                    });
                }
            });
        return container;
    }
}
    