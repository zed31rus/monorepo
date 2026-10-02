using FluentValidation;

namespace zed31rus.Apps.Authorization.Clients.Web.External.Validators;

public class Session : AbstractValidator<Options.Session>
{
    public Session()
    {
        RuleFor(x => x.cookies).NotNull().ChildRules(cookies =>
        {
            cookies.RuleFor(c => c.refresh.name).NotEmpty();
            cookies.RuleFor(c => c.refresh.options).NotNull();

            cookies.RuleFor(c => c.access.name).NotEmpty();
            cookies.RuleFor(c => c.access.options).NotNull();
        });
    }
}