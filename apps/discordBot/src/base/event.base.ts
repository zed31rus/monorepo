import type { ClientEvents } from 'discord.js';
import BotBase, { type BotBaseArgs } from './base.js';
import ManagerContainer from '#containers/manager.container.js';
import type { RabbitFromAuthQueues } from '@zed31rus/types/rabbitmq.js';

export abstract class BaseEvent<
	EventType = keyof ClientEvents | keyof RabbitFromAuthQueues,
> extends BotBase {
	protected readonly type: EventType;

	constructor(
		eventType: EventType,
		readonly manager: ManagerContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
		this.type = eventType;

		this.client.on(this.type, (...args) => {
			this.action(...args);
		});
	}

	protected abstract action(...args: ClientEvents[EventType]): void | Promise<void>;
}

export type BaseEventArgs =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ConstructorParameters<typeof BaseEvent> extends [any, ...infer Rest] ? Rest : [];
export default BaseEvent;
