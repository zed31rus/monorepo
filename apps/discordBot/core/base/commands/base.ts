import type RegistryContainer from '#core/containers/registry.js';
import { Events, type ClientEvents, type SlashCommandBuilder } from 'discord.js';
import BotBase, { type BotBaseArgs } from '../bot.js';

export default abstract class BaseCommand extends BotBase {
	constructor(
		readonly registry: RegistryContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
		this.events.discord.on(
			Events.InteractionCreate,
			(...args: ClientEvents['interactionCreate']) => {
				this.action(...args);
			}
		);
	}

	abstract data: SlashCommandBuilder;
	abstract action(...args: ClientEvents['interactionCreate']): void | Promise<void>;
}

export type BaseCommandArgs = ConstructorParameters<typeof BaseCommand>;
