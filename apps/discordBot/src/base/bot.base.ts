import Base, { type BaseArgs } from '@zed31rus/base';
import { EventEmitter } from 'events';
import DBContainer from '@packages/db';
import { type Client, type ClientEvents } from 'discord.js';
import type InfraContainer from '@packages/infra';
import type { RabbitFromAuthQueues } from '@packages/infra';

abstract class BotBase extends Base {
	events: {
		discord: EventEmitter;
		internal: EventEmitter<RabbitFromAuthQueues>;
	};
	constructor(
		readonly client: Client<true>,
		readonly db: InstanceType<(typeof DBContainer)['discordBot']>,
		readonly infra: InfraContainer,
		eventEmitter: EventEmitter<RabbitFromAuthQueues>,
		...baseArgs: BaseArgs
	) {
		super(...baseArgs);
		this.events = {
			discord: this.client as EventEmitter<ClientEvents>,
			internal: eventEmitter,
		};
	}
}

export type BotBaseArgs = ConstructorParameters<typeof BotBase>;

export default BotBase;
