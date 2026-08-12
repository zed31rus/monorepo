import CommandEmitterContainer from '#core/containers/emitters/command.js';
import type { CacheType, ChatInputCommandInteraction } from 'discord.js';
import BaseCommandEmitter, { type BaseCommandArgs } from '../../base.js';
import type BaseSlashCommand from '../base.js';

export default abstract class BaseSlashSubcommand<I extends CacheType> extends BaseCommandEmitter {
	abstract command: BaseSlashCommand<ChatInputCommandInteraction<I>>;
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
