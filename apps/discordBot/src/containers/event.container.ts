import type OnConnectGuildVoiceEvent from '#events/guild/voice/hub/onConnect.hub.guildVoice.event.js';
import type OnDisconnectGuildVoiceEvent from '#events/guild/voice/hub/onDisconnect.hub.guildVoice.event.js';

export default class EventContainer {
	constructor(
		readonly guild: {
			readonly voice: {
				readonly hub: {
					readonly onConnect: OnConnectGuildVoiceEvent;
					readonly onDisconnect: OnDisconnectGuildVoiceEvent;
				};
			};
		}
	) {}
}
