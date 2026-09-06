import type { ChatInputCommandInteraction } from 'discord.js';
import BaseSlashCommand, { type BaseSlashCommandArgs } from './base.js';

export default abstract class BaseGlobalSlashCommand extends BaseSlashCommand<
	ChatInputCommandInteraction<'cached'>
> {
	constructor(...botBaseArgs: BaseSlashCommandArgs) {
		super(...botBaseArgs);

		this.registries.commands.global.register(this);
	}
}

export type BaseGlobalSlashCommandArgs = ConstructorParameters<typeof BaseGlobalSlashCommand>;
