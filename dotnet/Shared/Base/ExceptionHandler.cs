namespace zed31rus.Shared.Base;

public interface IExceptionHandlerBase
{
    public Exception Translate(Exception exception);
}