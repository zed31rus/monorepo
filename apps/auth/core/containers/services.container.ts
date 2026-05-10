import AccountService from "#core/services/account.service.js";
import AuthService from "#core/services/auth.service.js";
import MeService from "#core/services/me.service.js";
import DiscordOauthService from "#core/services/oauth/discord.oauth.service.js";
import UsersService from "#core/services/users.service.js";

export default class ServiceContainer {

    constructor(
        readonly account: AccountService,
        readonly auth: AuthService,
        readonly me: MeService,
        readonly users: UsersService,
        readonly oauth: {
            discord: DiscordOauthService
        }
    ) {}

}