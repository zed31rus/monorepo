import type { ChatInputCommandInteraction } from 'discord.js';
import BaseSlashCommand, { type BaseSlashCommandArgs } from './base.js';

export default abstract class BaseGuildSlashCommand extends BaseSlashCommand {
	constructor(...botBaseArgs: BaseSlashCommandArgs) {
		super(...botBaseArgs);

		this.registry.commands.guild.register(this);
	}

	abstract action(interaction: ChatInputCommandInteraction<'cached'>): void | Promise<void>;
}

export type BaseGuildSlashCommandArgs = ConstructorParameters<typeof BaseGuildSlashCommand>;
