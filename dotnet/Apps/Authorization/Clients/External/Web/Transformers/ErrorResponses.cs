using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace zed31rus.Apps.Authorization.Clients.External.Web.Transformers;

internal sealed class ErrorResponsesTransformer : IOpenApiOperationTransformer
{
    public async Task TransformAsync(
        OpenApiOperation operation,
        OpenApiOperationTransformerContext context,
        CancellationToken ct)
    {
        var schema = await context.GetOrCreateSchemaAsync(typeof(Microsoft.AspNetCore.Mvc.ProblemDetails), null, ct);
        operation.Responses ??= new OpenApiResponses();

        Add(operation, StatusCodes.Status500InternalServerError.ToString(), "INTERNAL", schema);
        Add(operation, StatusCodes.Status429TooManyRequests.ToString(), "TOO_MANY_REQUESTS", schema);
        
        var requiresAuth = context.Description.ActionDescriptor.EndpointMetadata
            .OfType<IAuthorizeData>()
            .Any();

        if (requiresAuth)
        {
            Add(operation, StatusCodes.Status401Unauthorized.ToString(), "UNAUTHORIZED", schema);
            Add(operation, StatusCodes.Status403Forbidden.ToString(), "FORBIDDEN", schema);
            operation.Security =
            [
                new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Bearer", context.Document)] = []
                }
            ];
        }
    }

    private static void Add(OpenApiOperation operation, string code, string description, IOpenApiSchema schema)
    {
        operation.Responses![code] = new OpenApiResponse
        {
            Description = description,
            Content = new Dictionary<string, OpenApiMediaType>
            {
                ["application/json"] = new OpenApiMediaType { Schema = schema }
            }
        };
    }
}