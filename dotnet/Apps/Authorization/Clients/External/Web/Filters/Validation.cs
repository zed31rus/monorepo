using FluentValidation;
using Zed31rus.Apps.Authorization.Clients.External.Web.Exceptions;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Filters;

public class ValidationFilter<T>(IValidator<T> validator) : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var target = context.Arguments.OfType<T>().FirstOrDefault();
        if (target is null)
        {
            return await next(context);
        }

        var validationResult = await validator.ValidateAsync(target, context.HttpContext.RequestAborted);
        
        if (!validationResult.IsValid)
        {
            {
                var errors = validationResult.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(e => e.ErrorMessage).ToArray());

                throw new WebExternalClientExceptions.ValidationFailedExternalClientException(errors);
            }
        }

        return await next(context);
    }
}