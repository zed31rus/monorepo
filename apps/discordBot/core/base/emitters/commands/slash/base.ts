import {
	Events,
	SlashCommandBuilder,
	SlashCommandSubcommandBuilder,
	SlashCommandSubcommandGroupBuilder,
	type CacheType,
	type ChatInputCommandInteraction,
	type Interaction,
} from 'discord.js';
import BaseCommandEmitter, { type BaseCommandEmitterArgs } from '../base.js';
import { InternalErrors } from '@shared/errors';

export default abstract class BaseSlashCommand<
	TypedInteraction extends ChatInputCommandInteraction<CacheType>,
> extends BaseCommandEmitter {
	protected subcommands = new Map<string, SubcommandBuilder<TypedInteraction>>();
	protected subcommandGroups = new Map<string, SubcommandGroupBuilder<TypedInteraction>>();

	private data = new SlashCommandBuilder();
	abstract action(interaction: TypedInteraction): void | Promise<void>;
	abstract init(): SlashCommandBuilder;

	constructor(...baseCommandEmitterArgs: BaseCommandEmitterArgs) {
		super(...baseCommandEmitterArgs);
		this.init();
	}

	setData(dataBuilder: (builder: SlashCommandBuilder) => SlashCommandBuilder) {
		this.data = dataBuilder(this.data);
		this.instances.eventRouter.on(
			`${Events.InteractionCreate}:${this.data.name}`,
			(interaction) => {
				this.handleInteraction(interaction);
			}
		);
		return this.data;
	}

	get getData() {
		return this.data;
	}

	createSubcommand(callback: (subcommand: SubcommandBuilder<TypedInteraction>) => void) {
		const subcommand = new SubcommandBuilder<TypedInteraction>();
		callback(subcommand);
		this.data.addSubcommand(subcommand);
		this.subcommands.set(subcommand.name, subcommand);
		return subcommand;
	}

	createSubcommandGroup(
		callback: (subcommandGroup: SubcommandGroupBuilder<TypedInteraction>) => void
	) {
		const subcommandGroup = new SubcommandGroupBuilder<TypedInteraction>();
		callback(subcommandGroup);
		this.data.addSubcommandGroup(subcommandGroup);
		this.subcommandGroups.set(subcommandGroup.name, subcommandGroup);
		return subcommandGroup;
	}

	getSubcommandGroup(name: string) {
		return this.subcommandGroups.get(name);
	}

	getSubcommandGroupOrThrow(name: string) {
		const group = this.subcommandGroups.get(name);
		if (!group)
			throw this.errors.internal.businessLogic(
				InternalErrors.BusinessLogicErrorMessage.NO_AVAILABLE_OPTIONS
			);
		return group;
	}

	protected typeGuard(interaction: Interaction): TypedInteraction {
		if (!interaction.isChatInputCommand())
			throw this.errors.internal.validation(
				InternalErrors.ValidationErrorMessage.TYPE_MISMATCH
			);
		return interaction as TypedInteraction;
	}

	protected async handleInteraction(interaction: Interaction) {
		const chatInputInteraction = this.typeGuard(interaction);
		const groupName = chatInputInteraction.options.getSubcommandGroup(false);
		const subcommandName = chatInputInteraction.options.getSubcommand(false);

		if (groupName && subcommandName) {
			const group = this.subcommandGroups.get(groupName);
			const subcommand = group?.subcommands.get(subcommandName);
			if (subcommand?.action) {
				await subcommand.action(chatInputInteraction);
				return;
			}
		}

		if (subcommandName) {
			const subcommand = this.subcommands.get(subcommandName);
			if (subcommand?.action) {
				await subcommand.action(chatInputInteraction);
				return;
			}
		}

		await this.action(chatInputInteraction);
	}
}

export type BaseSlashCommandArgs = ConstructorParameters<typeof BaseSlashCommand>;

export class SubcommandBuilder<
	TypedInteraction extends ChatInputCommandInteraction<CacheType> =
		ChatInputCommandInteraction<CacheType>,
> extends SlashCommandSubcommandBuilder {
	action?: (interaction: TypedInteraction) => void | Promise<void>;

	setAction(action: (interaction: TypedInteraction) => void | Promise<void>): this {
		this.action = action;
		return this;
	}
}

export class SubcommandGroupBuilder<
	TypedInteraction extends ChatInputCommandInteraction<CacheType> =
		ChatInputCommandInteraction<CacheType>,
> extends SlashCommandSubcommandGroupBuilder {
	public subcommands = new Map<string, SubcommandBuilder<TypedInteraction>>();

	createSubcommand(callback: (subcommand: SubcommandBuilder<TypedInteraction>) => void) {
		const subcommand = new SubcommandBuilder<TypedInteraction>();
		callback(subcommand);
		this.addSubcommand(subcommand);
		this.subcommands.set(subcommand.name, subcommand);
		return subcommand;
	}
}
