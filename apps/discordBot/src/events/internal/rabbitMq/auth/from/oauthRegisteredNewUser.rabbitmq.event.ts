import BaseRabbitMqEvent, {
	type BaseRabbitMqEventArgs,
} from '#base/event/internal/rabbitMq.internal.event.base.js';

export default class OauthRegisteredNewUserRabbitMqEvent extends BaseRabbitMqEvent {
	protected async action(uuid: string) {
		const user = await this.infra.internal.auth.users.getByUUID(uuid);
		const { oauthAccounts } = user;
		const oauthAccount = oauthAccounts[0];
		const providerUser = await this.client.users.fetch(oauthAccount.providerUserId);
		providerUser.send('Привет! Тестовое сообщение');
	}

	constructor(...baseRabbitMqEventDeps: BaseRabbitMqEventArgs) {
		super('oauthRegisteredNewUser', ...baseRabbitMqEventDeps);
	}
}
