using Scalar.AspNetCore;

namespace Authorization.Clients.Web.Extensions;

public static class Development
{
    public static void UseDevelopment(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapOpenApi();
        endpoints.MapScalarApiReference();
    }
}