using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Core.Exceptions;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Handlers;

public class ErrorHandler(ILogger<ErrorHandler> logger): IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken ct)
    {
        var (title, statusCode) = exception switch
        {
            CoreBusinessErrors.InvalidCredentialsException => ("UNAUTHORIZED", StatusCodes.Status401Unauthorized),
            CoreBusinessErrors.NotFoundException => ("NOT_FOUND",StatusCodes.Status404NotFound),
            CoreBusinessErrors.InternalException => ("INTERNAL", StatusCodes.Status500InternalServerError)
        };

        var problem = new ProblemDetails
        {
            Title = title,
        };
        
        logger.LogInformation(exception, "Exception translated as {statusCore}: {title}", statusCode, title);

        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(problem, ct);

        return true;
    }
}