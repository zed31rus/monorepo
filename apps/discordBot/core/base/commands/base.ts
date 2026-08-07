import type RegistryContainer from '#core/containers/registry.js';
import {
	SlashCommandSubcommandBuilder,
	type ClientEvents,
	type SlashCommandBuilder,
	type SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import BotBase, { type BotBaseArgs } from '../bot.js';
import type ServiceContainer from '#core/containers/service.js';

export default abstract class BaseCommand extends BotBase {
	constructor(
		readonly services: ServiceContainer,
		readonly registry: RegistryContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
	}

	abstract data:
		| SlashCommandBuilder
		| SlashCommandSubcommandsOnlyBuilder
		| SlashCommandSubcommandBuilder;
	abstract action(...args: ClientEvents['interactionCreate']): void | Promise<void>;
}

export type BaseCommandArgs = ConstructorParameters<typeof BaseCommand>;
