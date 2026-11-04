namespace Zed31rus.Apps.Authorization.Core.Exceptions;

public class CoreException(string message) : Exception(message);

public static class CoreBusinessExceptions
{
    public class InvalidCredentialsException() : CoreException("INVALID_CREDENTIALS");

    public class NotFoundException() : CoreException("NOT_FOUND");

    public class InternalException() : CoreException("INTERNAL");

    public class InvalidRole() : CoreException("INVALID_ROLE");
    
    public class UserNotFoundException() : CoreException("USER_NOT_FOUND");
}