import type { MessageControl, RabbitMessages, RabbitQueues } from '@packages/infra';
import BaseEvent, { type BaseEventArgs } from '../base.js';

export default abstract class BaseRabbitMqInternalEvent<
	EventType extends keyof RabbitMessages = keyof RabbitMessages,
> extends BaseEvent {
	protected readonly type: EventType;

	constructor(queue: RabbitQueues, eventType: EventType, ...baseEventArgs: BaseEventArgs) {
		super(...baseEventArgs);

		this.type = eventType;

		this.infra.rabbitmq.on(queue, this.type, async (data, control) => {
			await this.action(control, ...data);
		});
	}

	protected abstract action(
		control: MessageControl,
		...args: RabbitMessages[EventType]
	): void | Promise<void>;
}

export type BaseRabbitMqInternalEventArgs =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ConstructorParameters<typeof BaseRabbitMqInternalEvent> extends [any, any, ...infer Rest]
		? Rest
		: [];
