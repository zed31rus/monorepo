import type UsersInternalModule from '#web/modules/internal/users.internal.module.js';
import AccountMainModule from '#web/modules/main/account.main.module.js';
import AuthMainModule from '#web/modules/main/auth.main.module.js';
import MeMainModule from '#web/modules/main/me.main.module.js';
import DiscordOauthMainModule from '#web/modules/main/oauth/discord.oauth.main.module.js';
import UsersMainModule from '#web/modules/main/users.main.module.js';

class ModuleContainer {
	constructor(
		readonly main: {
			readonly account: AccountMainModule;
			readonly auth: AuthMainModule;
			readonly me: MeMainModule;
			readonly users: UsersMainModule;
			readonly oauth: {
				discord: DiscordOauthMainModule;
			};
		},

		readonly internal: {
			users: UsersInternalModule;
		}
	) {}
}

export type ModuleContainerArgs = ConstructorParameters<typeof ModuleContainer>;

export default ModuleContainer;
