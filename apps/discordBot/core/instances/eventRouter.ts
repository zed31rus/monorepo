import BaseInstance, { type BaseInstanceArgs } from '#core/base/instance.js';
import { Events, type ClientEvents } from 'discord.js';
import EventEmitter from 'node:events';

export default class EventRouterInstance extends BaseInstance {
	constructor(
		private eventEmitter: EventEmitter,
		...baseInstanceArgs: BaseInstanceArgs
	) {
		super(...baseInstanceArgs);

		this.client.on(Events.InteractionCreate, (interaction) => {
			if (interaction.isChatInputCommand())
				this.emit(`${Events.InteractionCreate}:${interaction.commandName}`, interaction);
		});
	}

	private emit<S extends string>(
		event: `${Events.InteractionCreate}:${S}`,
		...args: ClientEvents[Events.InteractionCreate]
	): boolean {
		return this.eventEmitter.emit(event, ...args);
	}

	on(
		event: `${Events.InteractionCreate}:${string}`,
		listener: (...args: ClientEvents[Events.InteractionCreate]) => void
	): EventEmitter;
	on<E extends keyof ClientEvents>(
		event: E extends Events.InteractionCreate ? never : E,
		listener: (...args: ClientEvents[E]) => void
	): EventEmitter;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	on(event: any, listener: (...args: any[]) => void): EventEmitter {
		return this.eventEmitter.on(event, listener);
	}
}
