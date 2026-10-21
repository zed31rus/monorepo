namespace zed31rus.Apps.Authorization.Core.Exceptions;

public class CoreException(string message) : Exception(message);

public class CoreBusinessErrors
{
    public class InvalidCredentialsException() : CoreException("INVALID_CREDENTIALS");

    public class NotFoundException() : CoreException("NOT_FOUND");

    public class InternalException() : CoreException("INTERNAL");
}