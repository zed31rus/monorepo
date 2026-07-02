import OauthDiscordInfra from './discord/oauth.discord.infra.js';
import UsersDiscordInfra from './discord/users.discord.infra.js';
import UsersAuthInternalInfra from './internal/auth/users.auth.internal.infra.js';
import RabbitMqInfra from './rabbitmq/rabbitmq.infra.js';
import OauthSpotifyInfra from './spotify/oauth.spotify.infra.js';

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
