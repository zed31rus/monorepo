import type OnConnectGuildVoiceDiscordEvent from '#core/events/discord/guild/voice/hub/onConnect.js';
import type OnDisconnectGuildVoiceDiscordEvent from '#core/events/discord/guild/voice/hub/onDisconnect.js';

export default class DiscordEventContainer {
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
