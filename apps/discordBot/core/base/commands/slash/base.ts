import {
	Events,
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	type ChatInputCommandInteraction,
} from 'discord.js';
import BaseCommand, { type BaseCommandArgs } from '../base.js';

export default abstract class BaseSlashCommand extends BaseCommand {
	protected subcommands: SubcommandBuilder[] = [];
	abstract data: SlashCommandBuilder;
	abstract action(interaction: ChatInputCommandInteraction): void | Promise<void>;

	constructor(
		readonly subcommandBuilderArgs: SubcommandBuilderArgs,
		...baseCommandArgs: BaseCommandArgs
	) {
		super(...baseCommandArgs);

		queueMicrotask(() => {
			this.instances.router.on(
				`${Events.InteractionCreate}:${this.data.name}`,
				(interaction) => {
					if (!interaction.isChatInputCommand()) return;
					this.handleInteraction(interaction);
				}
			);
		});
	}

	createSubcommand(callback: (subcommand: SubcommandBuilder) => void) {
		const subcommand = new SubcommandBuilder(...this.subcommandBuilderArgs);

		callback(subcommand);

		this.data.addSubcommand(subcommand.data);
		this.subcommands.push(subcommand);

		return subcommand;
	}

	protected async handleInteraction(interaction: ChatInputCommandInteraction) {
		if (!interaction.isChatInputCommand()) return;

		const subcommandName = interaction.options.getSubcommand(false);

		if (subcommandName) {
			const subcommand = this.subcommands.find((sub) => sub.data.name === subcommandName);

			if (subcommand?.action) {
				await subcommand.action(interaction);
				return;
			}
		}

		await this.action(interaction);
	}
}

export type BaseSlashCommandArgs = ConstructorParameters<typeof BaseSlashCommand>;

class SubcommandBuilder extends BaseCommand {
	data = new SlashCommandSubcommandBuilder();
	action: (interaction: ChatInputCommandInteraction) => void | Promise<void> = () => {};

	constructor(...baseCommandArgs: BaseCommandArgs) {
		super(...baseCommandArgs);
	}

	setAction(action: (interaction: ChatInputCommandInteraction) => void | Promise<void>): this {
		this.action = action;
		return this;
	}
}

type SubcommandBuilderArgs = ConstructorParameters<typeof SubcommandBuilder>;
