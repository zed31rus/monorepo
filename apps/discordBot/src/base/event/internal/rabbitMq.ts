import BotBase, { type BotBaseArgs } from '../../bot.js';
import ManagerContainer from '#containers/manager.js';
import type { RabbitFromAuthQueues } from '@packages/infra';

export default abstract class BaseRabbitMqInternalEvent<
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

		this.infra.rabbitmq.on(this.type, (...args) => {
			this.action(...args);
		});
	}

	protected abstract action(...args: RabbitFromAuthQueues[EventType]): void | Promise<void>;
}

export type BaseRabbitMqInternalEventArgs =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ConstructorParameters<typeof BaseRabbitMqInternalEvent> extends [any, ...infer Rest]
		? Rest
		: [];
