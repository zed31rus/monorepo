using Microsoft.AspNetCore.Authorization;
using Zed31rus.Apps.Authorization.Core.Base;
using Zed31rus.Apps.Authorization.Core.Extensions.Getters;
using Zed31rus.Apps.Authorization.Core.Managers;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Middlewares;

internal static class AuthorizationMiddleware
{
    public static IServiceCollection AddAuthorizationMiddleware(this IServiceCollection container)
    {
        container.AddAuthorization();

        container
            .AddOptions<AuthorizationOptions>()
            .Configure<IRoleManager, IEnumerable<BasePermission>>((options, roleManager, permissions) =>
            {
                options.InvokeHandlersAfterFailure = false;
                foreach (var permission in permissions)
                {
                    string requiredPermissionName = permission.Name;
                    
                    options.AddPolicy(requiredPermissionName, policy =>
                    {
                        policy.RequireAuthenticatedUser()
                            .RequireAssertion(context =>
                            {
                                var user = context.User.GetPublicUser();
                                var userChain = roleManager.GetRoleChain(user.Role);
                                var rolePermissions = roleManager.GetPermissions(userChain);

                                return rolePermissions.Contains(requiredPermissionName);
                            });
                    });
                }
            });
        return container;
    }
}
    