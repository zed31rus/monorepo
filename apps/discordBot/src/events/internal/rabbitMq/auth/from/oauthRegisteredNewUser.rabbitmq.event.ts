import BaseRabbitMqEvent, {
	type BaseRabbitMqEventArgs,
} from '#base/event/internal/rabbitMq.internal.event.base.js';
import { OauthProviders } from '@zed31rus/types';

export default class OauthRegisteredNewUserRabbitMqEvent extends BaseRabbitMqEvent {
	protected async action(uuid: string) {
		const { user } = await this.infra.internal.auth.users.getByUUID(
			uuid,
			OauthProviders.discord
		);
		const { oauthAccounts } = user;
		const oauthAccount = oauthAccounts[0];
		const providerUser = await this.client.users.fetch(oauthAccount.providerUserId);
		const guild = await this.client.guilds.fetch(this.config.env.PRIMARY_SERVER_ID);
		if (oauthAccount.accessToken) {
			await guild.members.add(providerUser, {
				accessToken: oauthAccount.accessToken,
			});
		}
	}

	constructor(...baseRabbitMqEventDeps: BaseRabbitMqEventArgs) {
		super('oauthRegisteredNewUser', ...baseRabbitMqEventDeps);
	}
}
