using Microsoft.Extensions.Logging;
using zed31rus.Apps.Authorization.Core.Errors;

namespace zed31rus.Apps.Authorization.Core.Handlers;

internal class ErrorHandler<T> where T : new()
{

    public void TryHandleAsync(Exception exception)
    {
        switch (exception)
        {
            case InvalidOperationException:
                throw new CoreBusinessErrors.NotFoundException();
        }
    }
}