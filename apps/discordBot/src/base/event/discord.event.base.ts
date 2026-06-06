import type { ClientEvents } from 'discord.js';
import BotBase, { type BotBaseArgs } from '../bot.base.js';
import ManagerContainer from '#containers/manager.container.js';

export abstract class BaseDiscordEvent<
	EventType extends keyof ClientEvents = keyof ClientEvents,
> extends BotBase {
	protected readonly type: EventType;

	constructor(
		eventType: EventType,
		readonly manager: ManagerContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
		this.type = eventType;

		this.events.discord.on(this.type, (...args: ClientEvents[EventType]) => {
			this.action(...args);
		});
	}

	protected abstract action(...args: ClientEvents[EventType]): void | Promise<void>;
}

export type BaseEventArgs =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ConstructorParameters<typeof BaseDiscordEvent> extends [any, ...infer Rest] ? Rest : [];
export default BaseDiscordEvent;
