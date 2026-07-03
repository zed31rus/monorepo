import type OnConnectGuildVoiceDiscordEvent from '#events/discord/guild/voice/hub/onConnect.js';
import type OnDisconnectGuildVoiceDiscordEvent from '#events/discord/guild/voice/hub/onDisconnect.js';
import type OauthRegisteredNewUser from '#events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.js';

export default class EventContainer {
	constructor(
		readonly discord: {
			readonly guild: {
				readonly voice: {
					readonly hub: {
						readonly onConnect: OnConnectGuildVoiceDiscordEvent;
						readonly onDisconnect: OnDisconnectGuildVoiceDiscordEvent;
					};
				};
			};
		},
		readonly internal: {
			readonly rabbitMq: {
				readonly auth: {
					readonly from: {
						readonly oauthRegisteredNewUser: OauthRegisteredNewUser;
					};
				};
			};
		}
	) {}
}
