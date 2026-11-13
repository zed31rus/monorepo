using Microsoft.Extensions.DependencyInjection;
using Zed31rus.Options.Shared.Constants;

namespace Zed31rus.Options.Auth.Attributes;

[AttributeUsage(AttributeTargets.Field | AttributeTargets.Method, Inherited = false)]
internal class ValueAttribute(ValueConstants.ValueTypes valueType, ServiceLifetime lifetime = ServiceLifetime.Singleton) : Attribute
{
    public ValueConstants.ValueTypes ValueType { get; } = valueType;
    public ServiceLifetime Lifetime { get; } = lifetime;

}
