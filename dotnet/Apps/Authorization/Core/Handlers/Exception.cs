using Microsoft.Extensions.Logging;
using zed31rus.Apps.Authorization.Core.Attributes;
using zed31rus.Apps.Authorization.Core.Exceptions;

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
            default:
                logger.LogError("Unhandled exception: {exception} in Core", exception);
                return new CoreBusinessErrors.InternalException();
        }
    }
}