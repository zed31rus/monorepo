import type BaseGuildSlashCommand from '#core/base/commands/slash/guild.js';
import BaseRegistry from '#core/base/registry.js';

export default class GuildCommandsRegistry extends BaseRegistry {
	private map = new Map<string, BaseGuildSlashCommand>();

	register(command: BaseGuildSlashCommand) {
		this.map.set(command.data.name, command);
	}

	get(name: string) {
		return this.map.get(name);
	}

	getAll() {
		return [...this.map.values()];
	}
}
