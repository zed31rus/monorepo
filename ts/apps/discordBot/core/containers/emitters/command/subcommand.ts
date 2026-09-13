import type DisableSubcommandVoiceFeatureGuildCommand from '#core/emitters/commands/guild/features/voice/subcommands/disable.js';
import type EnableSubcommandVoiceFeatureGuildCommand from '#core/emitters/commands/guild/features/voice/subcommands/enable.js';

export default class SubcommandEmitterContainer {
	constructor(
		readonly voice: {
			enable: EnableSubcommandVoiceFeatureGuildCommand;
			disable: DisableSubcommandVoiceFeatureGuildCommand;
		}
	) {}
}
