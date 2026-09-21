namespace zed31rus.Apps.Authorization.Core.Errors;

public class InvalidCredentialsException(string message = "Неверный логин или пароль") : Exception(message);