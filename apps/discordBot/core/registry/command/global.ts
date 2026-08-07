import type BaseGlobalSlashCommand from '#core/base/commands/slash/global.js';
import BaseRegistry from '#core/base/registry.js';

export default class GlobalCommandsRegistry extends BaseRegistry {
	private map = new Map<string, BaseGlobalSlashCommand>();

	register(command: BaseGlobalSlashCommand) {
		this.map.set(command.data.name, command);
	}

	get(name: string) {
		return this.map.get(name);
	}

	getAll() {
		return [...this.map.values()];
	}
}
