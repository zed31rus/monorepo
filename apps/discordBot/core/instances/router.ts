import BaseInstance, { type BaseInstanceArgs } from '#core/base/instance.js';
import { Events, type ClientEvents } from 'discord.js';
import EventEmitter from 'node:events';

export default class RouterInstance extends BaseInstance {
	constructor(
		private eventEmitter: EventEmitter,
		...baseInstanceArgs: BaseInstanceArgs
	) {
		super(...baseInstanceArgs);

		this.client.on(Events.InteractionCreate, (interaction) => {
			if (!interaction.isChatInputCommand()) return;
			this.emit(`${Events.InteractionCreate}:${interaction.commandName}`, interaction);
		});
	}

	private emit<E extends keyof ClientEvents>(event: `${E}:${string}`, ...args: ClientEvents[E]) {
		return this.eventEmitter.emit(event, ...args);
	}

	on<E extends keyof ClientEvents>(
		event: `${E}:${string}`,
		listener: (...args: ClientEvents[E]) => void
	) {
		return this.eventEmitter.on(event, listener);
	}
}
