namespace zed31rus.Apps.Authorization.Clients.External.Web.Exceptions;

public class WebExternalClientException(string message) : Exception(message);

public static class WebExternalClientExceptions
{
    public class RefreshTokenMissingExternalClientException() : WebExternalClientException("REFRESH_TOKEN_MISSING");

}