import type OnConnectGuildVoiceDiscordEvent from '#events/discord/guild/voice/hub/onConnect.hub.voice.guild.discord.event.js';
import type OnDisconnectGuildVoiceDiscordEvent from '#events/discord/guild/voice/hub/onDisconnect.hub.voice.guild.discord.event.js';
import type OauthRegisteredNewUser from '#events/internal/rabbitMq/auth/from/oauthRegisteredNewUser.from.auth.rabbitMq.internal.event.js';

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
