namespace zed31rus.Apps.Authorization.Core.Errors;

public class CoreBusinessErrors
{
    public class InvalidCredentialsException() : Exception("INVALID_CREDENTIALS");

    public class NotFoundException() : Exception("NOT_FOUND");

}