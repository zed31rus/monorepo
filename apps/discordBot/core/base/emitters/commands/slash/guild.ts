import type { ChatInputCommandInteraction, Interaction } from 'discord.js';
import BaseSlashCommand, { type BaseSlashCommandArgs } from './base.js';
import { InternalErrors } from '@shared/errors';

export default abstract class BaseGuildSlashCommand extends BaseSlashCommand<
	ChatInputCommandInteraction<'cached'>
> {
	constructor(...botBaseArgs: BaseSlashCommandArgs) {
		super(...botBaseArgs);

		this.registry.commands.guild.register(this);
	}

	protected typeGuard(interaction: Interaction) {
		if (!interaction.isChatInputCommand())
			throw this.errors.internal.validation(
				InternalErrors.ValidationErrorMessage.TYPE_MISMATCH
			);
		if (!interaction.inCachedGuild())
			throw this.errors.internal.validation(
				InternalErrors.ValidationErrorMessage.TYPE_MISMATCH
			);
		return interaction;
	}
}

export type BaseGuildSlashCommandArgs = ConstructorParameters<typeof BaseGuildSlashCommand>;
