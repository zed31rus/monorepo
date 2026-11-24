using System.Text;
using Microsoft.AspNetCore.OpenApi;
using Zed31rus.Apps.Authorization.Clients.External.Web.Transformers;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Openapi;

public static class UseOpenApi
{
    public static IServiceCollection AddAppOpenApi(this IServiceCollection container)
    {
        container.AddOpenApi(options =>
        {
            options.AddDocumentTransformer<BearerSecurityTransformer>();
            options.AddOperationTransformer<ErrorResponsesTransformer>();
            options.CreateSchemaReferenceId = typeInfo =>
            {
                var type = typeInfo.Type;

                if (type.IsArray)
                {
                    return null;
                }
                
                if (type.IsPrimitive || type == typeof(string) || type == typeof(decimal) ||
                    type == typeof(Guid) || type == typeof(DateTime) || type == typeof(DateTimeOffset) ||
                    type.IsEnum)
                {
                    return null;
                }

                if (type.IsGenericType)
                {
                    return OpenApiOptions.CreateDefaultSchemaReferenceId(typeInfo);
                }

                var parts = new Stack<string>();
                for (Type? current = type; current is not null; current = current.DeclaringType)
                {
                    var name = current.Name;

                    var backtickIndex = name.IndexOf('`');
                    if (backtickIndex >= 0)
                    {
                        name = name[..backtickIndex];
                    }

                    if (current.DeclaringType is null && name.EndsWith("Dto", StringComparison.Ordinal))
                    {
                        name = name[..^3];
                    }

                    parts.Push(name);
                }

                var sb = new StringBuilder();
                while (parts.Count > 0)
                {
                    sb.Append(parts.Pop());
                }

                return sb.ToString();
            };
        });

        return container;
    }
}