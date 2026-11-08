using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Zed31rus.Apps.Authorization.Clients.External.Web.Exceptions;
using Zed31rus.Apps.Authorization.Core.Exceptions;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Handlers;

public class AppExceptionHandler(ILogger<AppExceptionHandler> logger): IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken ct)
    {
        var (title, statusCode) = exception switch
        {
            CoreBusinessExceptions.InvalidCredentialsException => ("UNAUTHORIZED", StatusCodes.Status401Unauthorized),
            CoreBusinessExceptions.UserNotFoundException => ("UNAUTHORIZED", StatusCodes.Status401Unauthorized),
            CoreBusinessExceptions.NotFoundException => ("NOT_FOUND", StatusCodes.Status404NotFound),
            CoreBusinessExceptions.InvalidRole => ("INTERNAL", StatusCodes.Status500InternalServerError),
            CoreBusinessExceptions.InternalException => ("INTERNAL", StatusCodes.Status500InternalServerError),
            
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