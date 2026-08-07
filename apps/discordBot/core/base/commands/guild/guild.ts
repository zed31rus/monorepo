import type { ChatInputCommandInteraction } from 'discord.js';
import BaseListenedCommand, { type BaseListenedCommandArgs } from './listened.js';

export default abstract class BaseGuildListenedCommand extends BaseListenedCommand {
	constructor(...botBaseArgs: BaseListenedCommandArgs) {
		super(...botBaseArgs);

		this.registry.commands.guild.register(this);
	}

	abstract action(interaction: ChatInputCommandInteraction<'cached'>): void | Promise<void>;
}

export type BaseGuildCommandArgs = ConstructorParameters<typeof BaseGuildListenedCommand>;
