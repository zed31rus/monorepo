import { Events, type ClientEvents } from 'discord.js';
import BaseEventEmitter, { type BaseEventArgs } from './base.js';

export default abstract class BaseDiscordEventEmitter<
	EventType extends keyof ClientEvents = keyof ClientEvents,
> extends BaseEventEmitter {
	protected readonly type: EventType;

	constructor(eventType: EventType, ...baseEventArgs: BaseEventArgs) {
		super(...baseEventArgs);
		this.type = eventType;

		this.instances.eventRouter.on(`${Events.InteractionCreate}`, () => {});
	}

	protected abstract action(...args: ClientEvents[EventType]): void | Promise<void>;
}

export type BaseDiscordEventArgs =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ConstructorParameters<typeof BaseDiscordEventEmitter> extends [any, ...infer Rest] ? Rest : [];
