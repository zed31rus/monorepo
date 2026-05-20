import type ActivityManager from '#managers/activity.manager.js';
import type ServerNameManager from '#managers/serverName.manager.js';
import type VoiceManager from '#managers/voice.manager.js';

export default class ManagerContainer {
	constructor(
		readonly activity: ActivityManager,
		readonly serverName: ServerNameManager,
		readonly voice: VoiceManager
	) {}
}
