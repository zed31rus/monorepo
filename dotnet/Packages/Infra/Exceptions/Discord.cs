namespace Zed31rus.Packages.Infra.Exceptions;

public class DiscordInfraException(string message) : Exception(message);

public static class DiscordInfraExceptions
{
    public class RequestException() : DiscordInfraException("REQUEST_EXCEPTION");
}