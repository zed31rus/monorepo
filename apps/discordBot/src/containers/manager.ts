import type ActivityManager from '#managers/activity.js';
import type ServerNameManager from '#managers/serverName.js';
import type VoiceManager from '#managers/voice.js';

export default class ManagerContainer {
	constructor(
		readonly activity: ActivityManager,
		readonly serverName: ServerNameManager,
		readonly voice: VoiceManager
	) {}
}
