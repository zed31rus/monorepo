using Zed31rus.Options.Global.Options;
using Zed31rus.Options.Shared.Attributes;
using Zed31rus.Options.Shared.Constants;

namespace Zed31rus.Options.Global.Values;

public class TemplateValues
{
    [Value(ValueConstants.ValueTypes.Template)]
    public static readonly DomainOption DomainOption = new()
    {
        MainDomain = "nicetemplate.website"
    };
}