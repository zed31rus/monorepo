import type OauthRegisteredNewUser from '#core/events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.js';

export default class RabbitMqInternalEventContainer {
	constructor(
		readonly auth: {
			readonly from: {
				readonly oauthRegisteredNewUser: OauthRegisteredNewUser;
			};
		}
	) {}
}
