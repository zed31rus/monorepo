using Scalar.AspNetCore;

namespace Authorization.Web.Extensions;

public static class Development
{
    public static void UseDevelopment(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapOpenApi();
        endpoints.MapScalarApiReference();
    }
}