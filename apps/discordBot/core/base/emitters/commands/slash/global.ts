import type { ChatInputCommandInteraction } from 'discord.js';
import BaseSlashCommand, { type BaseSlashCommandArgs } from './base.js';

export default abstract class BaseGlobalSlashCommand extends BaseSlashCommand {
	constructor(...botBaseArgs: BaseSlashCommandArgs) {
		super(...botBaseArgs);

		this.registry.commands.global.register(this);
	}

	abstract action(interaction: ChatInputCommandInteraction<'cached'>): void | Promise<void>;
}

export type BaseGlobalSlashCommandArgs = ConstructorParameters<typeof BaseGlobalSlashCommand>;
