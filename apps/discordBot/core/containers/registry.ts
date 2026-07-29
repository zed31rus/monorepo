import type GlobalCommandsRegistry from '#core/registry/command/global.js';
import type GuildCommandsRegistry from '#core/registry/command/guild.js';
import type FeatureRegistry from '#core/registry/feature.js';

export default class RegistryContainer {
	constructor(
		readonly commands: {
			global: GlobalCommandsRegistry;
			guild: GuildCommandsRegistry;
		},
		readonly feature: FeatureRegistry
	) {}
}
