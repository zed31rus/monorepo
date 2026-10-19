using System.Reflection;

namespace zed31rus.Packages.Libs.Proxies;

public class ErrorHandlerProxy<T> : DispatchProxy where T : class
{
    private T _inner = null!;
    private Func<Exception, Exception> _handle = null!;

    public static T Create(T inner, Func<Exception, Exception> handler)
    {
        var proxy = Create<T, ErrorHandlerProxy<T>>();
        var typed = (ErrorHandlerProxy<T>)(object)proxy;
        typed._inner = inner;
        typed._handle = handler;
        return proxy;
    }

    protected override object? Invoke(MethodInfo? targetMethod, object?[]? args)
    {
        var method = targetMethod!;
        var returnType = method.ReturnType;

        try
        {
            var result = method.Invoke(_inner, args);

            if (returnType == typeof(Task))
                return HandleTask((Task)result!);

            if (returnType.IsGenericType && returnType.GetGenericTypeDefinition() == typeof(Task<>))
                return CallGeneric(nameof(HandleTaskOfT), returnType.GetGenericArguments()[0], result!);

            if (returnType == typeof(ValueTask))
                return HandleValueTask((ValueTask)result!);

            if (returnType.IsGenericType && returnType.GetGenericTypeDefinition() == typeof(ValueTask<>))
                return CallGeneric(nameof(HandleValueTaskOfT), returnType.GetGenericArguments()[0], result!);

            return result;
        }
        catch (TargetInvocationException ex)
        {
            throw _handle(ex.InnerException ?? ex);
        }
    }

    private object? CallGeneric(string methodName, Type resultType, object arg)
    {
        return typeof(ErrorHandlerProxy<T>)
            .GetMethod(methodName, BindingFlags.NonPublic | BindingFlags.Instance)!
            .MakeGenericMethod(resultType)
            .Invoke(this, [arg]);
    }

    private async Task HandleTask(Task task)
    {
        try { await task; }
        catch (Exception ex) { throw _handle(ex); }
    }

    private async Task<TResult> HandleTaskOfT<TResult>(Task<TResult> task)
    {
        try { return await task; }
        catch (Exception ex) { throw _handle(ex); }
    }

    private async ValueTask HandleValueTask(ValueTask task)
    {
        try { await task; }
        catch (Exception ex) { throw _handle(ex); }
    }

    private async ValueTask<TResult> HandleValueTaskOfT<TResult>(ValueTask<TResult> task)
    {
        try { return await task; }
        catch (Exception ex) { throw _handle(ex); }
    }
}