namespace zed31rus.Apps.Authorization.Core.Errors;

internal class InvalidCredentialsException(string message = "Неверный логин или пароль") : Exception(message);