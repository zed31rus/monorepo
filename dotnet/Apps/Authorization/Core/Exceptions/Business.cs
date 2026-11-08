namespace Zed31rus.Apps.Authorization.Core.Exceptions;

public class CoreException(string message) : Exception(message);

public static class CoreBusinessExceptions
{
    public class InvalidCredentialsException() : CoreException("INVALID_CREDENTIALS");

    public class NotFoundException() : CoreException("NOT_FOUND");

    public class InternalException() : CoreException("INTERNAL");

    public class InvalidRole() : CoreException("INVALID_ROLE");
    
    public class UserNotFoundException() : CoreException("USER_NOT_FOUND");

    public static class Oauth
    {
        public class LoginAlreadyExists() : CoreException("LOGIN_ALREADY_EXISTS");
        public class EmailMissingException() : CoreException("OAUTH_EMAIL_MISSING");

        public class EmailNotVerifiedException() : CoreException("OAUTH_EMAIL_NOT_VERIFIED");

        public class UserHasAnotherAccountException() : CoreException("USER_HAS_ANOTHER_ACCOUNT");

        public class AccountLinkedToAnotherUserException() : CoreException("ACCOUNT_LINKED_TO_ANOTHER_USER");
    }
}