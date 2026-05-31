import OauthDiscordInfra from './discord/oauth.discord.infra.js';
import UsersDiscordInfra from './discord/users.discord.infra.js';
import RabbitMqInfra from './rabbitmq/rabbitmq.infra.js';

export default class InfraContainer {
	constructor(
		readonly rabbitmq: RabbitMqInfra,
		readonly discord: {
			readonly oauth: OauthDiscordInfra;
			readonly users: UsersDiscordInfra;
		}
	) {}

	static deps = {
		RabbitMqInfra,
		discord: { oauth: OauthDiscordInfra, users: UsersDiscordInfra },
	};
}
