namespace Zed31rus.Options.Global.Options;

public interface IDomainOption
{
    string MainDomain { get; }
}

public class DomainOption: IDomainOption
{
    public required string MainDomain { get; set; }
}