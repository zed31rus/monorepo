using FluentValidation;
using Zed31rus.Apps.Authorization.Clients.External.Web.Validators.Rules;

namespace Zed31rus.Apps.Authorization.Clients.External.Web.Features.Me;

public class MeValidator
{
    public class UpdateNickname
    {
        public class Request : AbstractValidator<MeDto.UpdateNickname.Request>
        {
            public Request()
            {
                RuleFor(x => x.Nickname).Nickname();
            }
        }
    }
}