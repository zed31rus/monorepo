import type UsersInternalModule from '#web/modules/internal/users.internal.module.js';
import AccountMainModule from '#web/modules/public/account.public.module.js';
import AuthMainModule from '#web/modules/public/auth.public.module.js';
import MeMainModule from '#web/modules/public/me.public.module.js';
import DiscordOauthMainModule from '#web/modules/public/oauth/discord.oauth.main.module.js';
import UsersMainModule from '#web/modules/public/users.public.module.js';

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
