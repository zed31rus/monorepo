import type VoiceFeatureGuildCommand from '#core/commands/guild/features/voice/main.js';

export default class CommandContainer {
	constructor(readonly guild: { voice: VoiceFeatureGuildCommand }) {}
}
