import type AccountExternalWebOpenAPI from '#web/openapi/external/account.js';
import type AuthExternalWebOpenAPI from '#web/openapi/external/auth.js';
import type MeExternalWebOpenAPI from '#web/openapi/external/me.js';
import type DiscordOauthExternalWebOpenAPI from '#web/openapi/external/oauth/discord.js';
import type UsersExternalWebOpenAPI from '#web/openapi/external/users.js';
import type UsersInternalWebOpenAPI from '#web/openapi/internal/users.js';

class WebOpenAPIContainer {
	constructor(
		readonly external: {
			readonly account: AccountExternalWebOpenAPI;
			readonly auth: AuthExternalWebOpenAPI;
			readonly me: MeExternalWebOpenAPI;
			readonly users: UsersExternalWebOpenAPI;
			readonly oauth: {
				discord: DiscordOauthExternalWebOpenAPI;
			};
		},
		readonly internal: {
			readonly users: UsersInternalWebOpenAPI;
		}
	) {}
}

export default WebOpenAPIContainer;
