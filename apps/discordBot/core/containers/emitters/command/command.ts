import type VoiceFeatureGuildCommand from '#core/emitters/commands/guild/features/voice/main.js';

export default class CommandEmitterContainer {
	constructor(
		readonly guild: {
			voice: VoiceFeatureGuildCommand;
		}
	) {}
}
