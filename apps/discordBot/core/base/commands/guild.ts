import BaseCommand, { type BaseCommandArgs } from './base.js';

export default abstract class BaseGuildCommand extends BaseCommand {
	constructor(...botBaseArgs: BaseCommandArgs) {
		super(...botBaseArgs);

		this.registry.commands.guild.register(this);
	}
}

export type BaseGuildCommandArgs = ConstructorParameters<typeof BaseGuildCommand>;
