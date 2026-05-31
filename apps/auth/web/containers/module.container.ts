import type AccountExternalModule from '#web/modules/external/account.external.module.js';
import type AuthExternalModule from '#web/modules/external/auth.external.module.js';
import type MeExternalModule from '#web/modules/external/me.external.module.js';
import type DiscordOauthExternalModule from '#web/modules/external/oauth/discord.oauth.external.module.js';
import type UsersExternalModule from '#web/modules/external/users.external.module.js';
import type UsersInternalModule from '#web/modules/internal/users.internal.module.js';

class ModuleContainer {
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

export type ModuleContainerArgs = ConstructorParameters<typeof ModuleContainer>;

export default ModuleContainer;
