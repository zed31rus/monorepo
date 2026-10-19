using Microsoft.Extensions.Logging;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Errors;

namespace zed31rus.Apps.Authorization.Core.Handlers;

interface IErrorHandler
{
    public Exception Translate(Exception exception);
}

[Handler]
internal sealed class ErrorHandler(ILogger<ErrorHandler> logger) : IErrorHandler
{
    public Exception Translate(Exception exception)
    {
        switch (exception)
        {
            case CoreException:
            case OperationCanceledException:
                return exception;

            case InvalidOperationException:
                return new CoreBusinessErrors.NotFoundException();

            default:
                logger.LogError(exception, "Unhandled error in Core");
                return new CoreBusinessErrors.InternalException();
        }
    }
}