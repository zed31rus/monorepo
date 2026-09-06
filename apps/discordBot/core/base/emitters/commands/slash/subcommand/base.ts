import CommandEmitterContainer from '#core/containers/emitters/command/command.js';
import BaseCommandEmitter, { type BaseCommandEmitterArgs } from '../../base.js';

export default abstract class BaseSlashSubcommand extends BaseCommandEmitter {
	constructor(
		readonly commands: CommandEmitterContainer,
		...baseCommandArgs: BaseCommandEmitterArgs
	) {
		super(...baseCommandArgs);
		this.build();
	}

	abstract build(): void;
}

export type BaseSlashSubcommandArgs = ConstructorParameters<typeof BaseSlashSubcommand>;
