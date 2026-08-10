import {
	Events,
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	type ChatInputCommandInteraction,
	type Interaction,
} from 'discord.js';
import BaseCommandEmitter, { type BaseCommandArgs } from '../base.js';

export default abstract class BaseSlashCommand extends BaseCommandEmitter {
	protected subcommands = new Map<string, SubcommandBuilder>();
	abstract data: SlashCommandBuilder;
	abstract action(interaction: ChatInputCommandInteraction<'cached'>): void | Promise<void>;

	constructor(...baseCommandArgs: BaseCommandArgs) {
		super(...baseCommandArgs);

		queueMicrotask(() => {
			this.instances.eventRouter.on(
				`${Events.InteractionCreate}:${this.data.name}`,
				(interaction) => {
					this.handleInteraction(interaction);
				}
			);
		});
	}

	createSubcommand(callback: (subcommand: SubcommandBuilder) => void) {
		const subcommand = new SubcommandBuilder();

		callback(subcommand);

		this.data.addSubcommand(subcommand);
		this.subcommands.set(subcommand.name, subcommand);

		return subcommand;
	}

	protected async handleInteraction(interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;
		if (!interaction.inCachedGuild()) return;
		const subcommandName = interaction.options.getSubcommand(false);

		if (subcommandName) {
			const subcommand = this.subcommands.get(subcommandName);

			if (subcommand?.action) {
				await subcommand.action(interaction);
				return;
			}
		}

		await this.action(interaction);
	}
}

export type BaseSlashCommandArgs = ConstructorParameters<typeof BaseSlashCommand>;

class SubcommandBuilder extends SlashCommandSubcommandBuilder {
	action?: (interaction: ChatInputCommandInteraction<'cached'>) => void | Promise<void>;

	setAction(
		action: (interaction: ChatInputCommandInteraction<'cached'>) => void | Promise<void>
	): this {
		this.action = action;
		return this;
	}
}
