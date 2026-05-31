import type AccountExternalOpenAPI from '#web/openapi/external/account.external.openapi.js';
import type AuthExternalOpenAPI from '#web/openapi/external/auth.external.openapi.js';
import type MeExternalOpenAPI from '#web/openapi/external/me.external.openapi.js';
import type DiscordOauthExternalOpenAPI from '#web/openapi/external/oauth/discord.oauth.external.openapi.js';
import type UsersExternalOpenAPI from '#web/openapi/external/users.external.openapi.js';
import type UsersInternalOpenAPI from '#web/openapi/internal/users.internal.openapi.js';

class OpenAPIContainer {
	constructor(
		readonly external: {
			readonly account: AccountExternalOpenAPI;
			readonly auth: AuthExternalOpenAPI;
			readonly me: MeExternalOpenAPI;
			readonly users: UsersExternalOpenAPI;
			readonly oauth: {
				discord: DiscordOauthExternalOpenAPI;
			};
		},
		readonly internal: {
			readonly users: UsersInternalOpenAPI;
		}
	) {}
}

export type OpenAPIContainerArgs = ConstructorParameters<typeof OpenAPIContainer>;

export default OpenAPIContainer;
