namespace Zed31rus.Apps.Authorization.Core.Exceptions;

public class CoreException(string message) : Exception(message);

public class OauthCoreException(string message) : CoreException(message);

public static class CoreBusinessExceptions
{
    public class InvalidCredentialsException() : CoreException("INVALID_CREDENTIALS");
    public class NotFoundException() : CoreException("NOT_FOUND");
    public class InternalException() : CoreException("INTERNAL");
    public class InvalidRole() : CoreException("INVALID_ROLE");
    public class UserNotFoundException() : CoreException("USER_NOT_FOUND");
    public class LoginAlreadyExists() : CoreException("LOGIN_ALREADY_EXISTS");
    public class EmailAlreadyExists() : CoreException("EMAIL_ALREADY_EXISTS");

    public static class Oauth
    {
        public class LoginAlreadyExists() : OauthCoreException("LOGIN_ALREADY_EXISTS");
        public class EmailMissingException() : OauthCoreException("OAUTH_EMAIL_MISSING");
        public class EmailNotVerifiedException() : OauthCoreException("OAUTH_EMAIL_NOT_VERIFIED");
        public class UserHasAnotherAccountException() : OauthCoreException("USER_HAS_ANOTHER_ACCOUNT");
        public class AccountLinkedToAnotherUserException() : OauthCoreException("ACCOUNT_LINKED_TO_ANOTHER_USER");
    }
}