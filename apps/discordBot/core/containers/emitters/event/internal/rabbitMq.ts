import type RegisteredNewUserOauthFromAuthRabbitMqEvent from '#core/emitters/events/internal/rabbitMq/auth/from/oauth/registeredNewUser.js';

export default class RabbitMqInternalEventEmitterContainer {
	constructor(
		readonly auth: {
			readonly from: {
				readonly oauth: {
					readonly registeredNewUser: RegisteredNewUserOauthFromAuthRabbitMqEvent;
				};
			};
		}
	) {}
}
