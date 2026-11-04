using Microsoft.Extensions.Logging;
using Zed31rus.Apps.Authorization.Core.Attributes;
using Zed31rus.Apps.Authorization.Core.Exceptions;
using Zed31rus.Shared.Base;

namespace Zed31rus.Apps.Authorization.Core.Handlers;

public interface IExceptionHandler : IExceptionHandlerBase;

[Handler]
internal sealed class ExceptionHandler(ILogger<ExceptionHandler> logger) : IExceptionHandler
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
                return new CoreBusinessExceptions.InternalException();
        }
    }
}