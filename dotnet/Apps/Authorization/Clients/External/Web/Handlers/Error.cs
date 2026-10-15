using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Handlers;

public class ErrorHandler(): IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken ct)
    {
        var (title, statusCode) = exception switch
        {
            Core.Errors.CoreBusinessErrors.InvalidCredentialsException => ("UNAUTHORIZED", StatusCodes.Status401Unauthorized),
            Core.Errors.CoreBusinessErrors.NotFoundException => ("NOT_FOUND",StatusCodes.Status404NotFound)
        };

        var problem = new ProblemDetails
        {
            Title = title,
            Detail = exception.Message
        };

        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(problem, ct);

        return true;
    }
}