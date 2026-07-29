import BaseCommand, { type BaseCommandArgs } from './base.js';

export default abstract class BaseGlobalCommand extends BaseCommand {
	constructor(...botBaseArgs: BaseCommandArgs) {
		super(...botBaseArgs);

		this.registry.commands.global.register(this);
	}
}

export type BaseGlobalCommandArgs = ConstructorParameters<typeof BaseGlobalCommand>;
