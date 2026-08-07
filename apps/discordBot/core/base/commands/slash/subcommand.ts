import CommandContainer from '#core/containers/command.js';
import BaseCommand, { type BaseCommandArgs } from '../base.js';

export default abstract class BaseSlashSubcommand extends BaseCommand {
	abstract command: ConstructorParameters<
		typeof CommandContainer
	>[number][keyof ConstructorParameters<typeof CommandContainer>[number]];

	constructor(
		readonly commands: CommandContainer,
		...baseCommandArgs: BaseCommandArgs
	) {
		super(...baseCommandArgs);
		this.build();
	}

	abstract build(): void;
}

export type BaseSlashSubcommandArgs = ConstructorParameters<typeof BaseSlashSubcommand>;
