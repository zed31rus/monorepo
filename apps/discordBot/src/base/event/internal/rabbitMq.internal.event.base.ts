import BotBase, { type BotBaseArgs } from '../../base.js';
import ManagerContainer from '#containers/manager.container.js';
import type { RabbitFromAuthQueues } from '@packages/infra';

export abstract class BaseRabbitMqEvent<
	EventType extends keyof RabbitFromAuthQueues = keyof RabbitFromAuthQueues,
> extends BotBase {
	protected readonly type: EventType;

	constructor(
		eventType: EventType,
		readonly manager: ManagerContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
		this.type = eventType;

		this.events.internal.on(this.type, (...args) => {
			this.action(...args);
		});
	}

	protected abstract action(...args: RabbitFromAuthQueues[EventType]): void | Promise<void>;
}

export type BaseRabbitMqEventArgs =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ConstructorParameters<typeof BaseRabbitMqEvent> extends [any, ...infer Rest] ? Rest : [];
export default BaseRabbitMqEvent;
