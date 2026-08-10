import type OnConnectGuildVoiceDiscordEvent from '#core/emitters/events/discord/guild/voice/hub/onConnect.js';
import type OnDisconnectGuildVoiceDiscordEvent from '#core/emitters/events/discord/guild/voice/hub/onDisconnect.js';

export default class DiscordEventEmitterContainer {
	constructor(
		readonly guild: {
			readonly voice: {
				readonly hub: {
					readonly onConnect: OnConnectGuildVoiceDiscordEvent;
					readonly onDisconnect: OnDisconnectGuildVoiceDiscordEvent;
				};
			};
		}
	) {}
}
