import BaseRabbitMqEvent, {
	type BaseRabbitMqEventArgs,
} from '#base/event/internal/rabbitMq.internal.event.base.js';

export default class OauthRegisteredNewUserRabbitMqEvent extends BaseRabbitMqEvent {
	protected action(uuid: string) {}

	constructor(...baseRabbitMqEventDeps: BaseRabbitMqEventArgs) {
		super('oauthRegisteredNewUser', ...baseRabbitMqEventDeps);
	}
}
