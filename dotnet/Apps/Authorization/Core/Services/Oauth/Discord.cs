using Zed31rus.Apps.Authorization.Core.Dto.User;
using Zed31rus.Apps.Authorization.Core.Managers;

namespace Zed31rus.Apps.Authorization.Core.Services.Oauth;

public record OauthServiceCallbackReturn(PersonalUser User, CoreSessionManagerSessionReturn Session);

internal class DiscordOauthService
{
    async Task<OauthServiceCallbackReturn> Callback(string code, PublicUser? user)
    {
        throw new NotImplementedException();
    }
}