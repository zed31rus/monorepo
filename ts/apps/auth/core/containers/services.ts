import AccountService from '#core/services/account.js';
import AuthService from '#core/services/auth.js';
import MeService from '#core/services/me.js';
import DiscordOauthService from '#core/services/oauth/discord.js';
import UsersService from '#core/services/users.js';

export default class ServiceContainer {
	constructor(
		readonly account: AccountService,
		readonly auth: AuthService,
		readonly me: MeService,
		readonly users: UsersService,
		readonly oauth: {
			discord: DiscordOauthService;
		}
	) {}
}
