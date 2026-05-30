import AccountPublicOpenAPI from '#web/openapi/public/account.public.openapi.js';
import AuthPublicOpenAPI from '#web/openapi/public/auth.public.openapi.js';
import MePublicOpenAPI from '#web/openapi/public/me.public.openapi.js';
import DiscordOauthPublicOpenAPI from '#web/openapi/public/oauth/discord.oauth.public.openapi.js';
import UsersPublicOpenAPI from '#web/openapi/public/users.public.openapi.js';

class OpenAPIContainer {
	constructor(
		readonly account: AccountPublicOpenAPI,
		readonly auth: AuthPublicOpenAPI,
		readonly me: MePublicOpenAPI,
		readonly users: UsersPublicOpenAPI,
		readonly oauth: {
			discord: DiscordOauthPublicOpenAPI;
		}
	) {}
}

export type OpenAPIContainerArgs = ConstructorParameters<typeof OpenAPIContainer>;

export default OpenAPIContainer;
