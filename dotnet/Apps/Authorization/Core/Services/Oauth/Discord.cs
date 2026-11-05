using Zed31rus.Apps.Authorization.Core.Dto.User;
using Zed31rus.Apps.Authorization.Core.Managers;
using Zed31rus.Packages.Db.Auth.Models;

namespace Zed31rus.Apps.Authorization.Core.Services.Oauth;

public record OauthServiceCallbackReturn(PersonalUser User, CoreSessionManagerSessionReturn Session);

internal class DiscordOauthService
{
    async Task<OauthServiceCallbackReturn> Callback(string code, PublicUser? user)
    {
        var exchangeReply = await 
    }
}