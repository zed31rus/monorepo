import CommandEmitterContainer from '#core/containers/emitters/command.js';
import BaseCommandEmitter, { type BaseCommandArgs } from '../base.js';

export default abstract class BaseSlashSubcommand extends BaseCommandEmitter {
	abstract command: ConstructorParameters<
		typeof CommandEmitterContainer
	>[number][keyof ConstructorParameters<typeof CommandEmitterContainer>[number]];

	constructor(
		readonly commands: CommandEmitterContainer,
		...baseCommandArgs: BaseCommandArgs
	) {
		super(...baseCommandArgs);
		this.build();
	}

	abstract build(): void;
}

export type BaseSlashSubcommandArgs = ConstructorParameters<typeof BaseSlashSubcommand>;
