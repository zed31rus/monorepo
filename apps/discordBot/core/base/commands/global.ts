import BaseListenedCommand, { type BaseListenedCommandArgs } from './guild/listened.js';

export default abstract class BaseGlobalListenedCommand extends BaseListenedCommand {
	constructor(...botBaseArgs: BaseListenedCommandArgs) {
		super(...botBaseArgs);

		this.registry.commands.global.register(this);
	}
}

export type BaseGlobalCommandArgs = ConstructorParameters<typeof BaseGlobalListenedCommand>;
