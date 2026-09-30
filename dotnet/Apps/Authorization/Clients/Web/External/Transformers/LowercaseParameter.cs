namespace zed31rus.Apps.Authorization.Clients.Web.External.Transformers;

public class LowercaseParameterTransformer : IOutboundParameterTransformer
{
    public string? TransformOutbound(object? value)
    {
        return value?.ToString()?.ToLowerInvariant();
    }
}