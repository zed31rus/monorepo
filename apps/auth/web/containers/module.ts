import type AccountExternalModule from '#web/modules/external/account.js';
import type AuthExternalModule from '#web/modules/external/auth.js';
import type MeExternalModule from '#web/modules/external/me.js';
import type DiscordOauthExternalModule from '#web/modules/external/oauth/discord.js';
import type UsersExternalModule from '#web/modules/external/users.js';
import type UsersInternalModule from '#web/modules/internal/users.js';

class WebModuleContainer {
	constructor(
		readonly external: {
			readonly account: AccountExternalModule;
			readonly auth: AuthExternalModule;
			readonly me: MeExternalModule;
			readonly users: UsersExternalModule;
			readonly oauth: {
				discord: DiscordOauthExternalModule;
			};
		},

		readonly internal: {
			users: UsersInternalModule;
		}
	) {}
}

export default WebModuleContainer;
