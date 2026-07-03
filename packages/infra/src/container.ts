import OauthDiscordInfra from './discord/oauth.js';
import UsersDiscordInfra from './discord/users.js';
import UsersAuthInternalInfra from './internal/auth/users.js';
import RabbitMqInfra from './rabbitmq/rabbitmq.js';
import OauthSpotifyInfra from './spotify/oauth.js';

export default class InfraContainer {
	constructor(
		readonly rabbitmq: RabbitMqInfra,
		readonly discord: {
			readonly oauth: OauthDiscordInfra;
			readonly users: UsersDiscordInfra;
		},
		readonly internal: {
			readonly auth: { users: UsersAuthInternalInfra };
		},
		readonly spotify: {
			readonly oauth: OauthSpotifyInfra;
		}
	) {}

	static deps = {
		rabbitmq: RabbitMqInfra,
		spotify: { oauth: OauthSpotifyInfra },
		discord: { oauth: OauthDiscordInfra, users: UsersDiscordInfra },
		internal: {
			auth: {
				users: UsersAuthInternalInfra,
			},
		},
	};
}
