using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using zed31rus.Apps.Authorization.Clients.External.Web.Exceptions;
using zed31rus.Apps.Authorization.Core.Exceptions;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Handlers;

public class ErrorHandler(ILogger<ErrorHandler> logger): IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken ct)
    {
        var (title, statusCode) = exception switch
        {
            CoreBusinessErrors.InvalidCredentialsException => ("UNAUTHORIZED", StatusCodes.Status401Unauthorized),
            CoreBusinessErrors.UserNotFoundException => ("UNAUTHORIZED", StatusCodes.Status401Unauthorized),
            CoreBusinessErrors.NotFoundException => ("NOT_FOUND", StatusCodes.Status404NotFound),
            CoreBusinessErrors.InvalidRole => ("INTERNAL", StatusCodes.Status500InternalServerError),
            CoreBusinessErrors.InternalException => ("INTERNAL", StatusCodes.Status500InternalServerError),
            
            WebExternalClientExceptions.RefreshTokenMissingExternalClientException => ("UNAUTHORIZED", StatusCodes.Status401Unauthorized),

            _ => ("INTERNAL", StatusCodes.Status500InternalServerError)
            
            
        };

        if (statusCode >= StatusCodes.Status500InternalServerError)
        {
            logger.LogError(exception, "Unhandled exception translated as {statusCode}: {title}", statusCode, title);
        }
        else
        {
            logger.LogInformation(exception, "Exception translated as {statusCode}: {title}", statusCode, title);
        }
        
        var problem = new ProblemDetails
        {
            Title = title,
        };
        
        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(problem, ct);

        return true;
    }
}