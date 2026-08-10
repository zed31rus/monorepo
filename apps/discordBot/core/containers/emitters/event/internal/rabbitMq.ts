import type OauthRegisteredNewUser from '#core/emitters/events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.js';

export default class RabbitMqInternalEventEmitterContainer {
	constructor(
		readonly auth: {
			readonly from: {
				readonly oauthRegisteredNewUser: OauthRegisteredNewUser;
			};
		}
	) {}
}
