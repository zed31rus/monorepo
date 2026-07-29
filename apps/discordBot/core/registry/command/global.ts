import type BaseGlobalCommand from '#core/base/commands/global.js';
import BaseRegistry from '#core/base/registry.js';

export default class GlobalCommandsRegistry extends BaseRegistry {
	private map = new Map<string, BaseGlobalCommand>();

	register(command: BaseGlobalCommand) {
		this.map.set(command.data.name, command);
	}

	get(name: string) {
		return this.map.get(name);
	}

	getAll() {
		return [...this.map.values()];
	}
}
