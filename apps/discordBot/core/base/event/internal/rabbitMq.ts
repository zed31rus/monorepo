import BotBase, { type BotBaseArgs } from '#core/base/bot.js';
import type { MessageControl, RabbitMessages, RabbitQueues } from '@packages/infra';

export default abstract class BaseRabbitMqInternalEvent<
	EventType extends keyof RabbitMessages = keyof RabbitMessages,
> extends BotBase {
	protected readonly type: EventType;

	constructor(queue: RabbitQueues, eventType: EventType, ...botBaseArgs: BotBaseArgs) {
		super(...botBaseArgs);

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
