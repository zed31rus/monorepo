import Base, { type BaseArgs } from '@zed31rus/base';
import { EventEmitter } from 'events';
import DBContainer from '@packages/db';
import { REST, type Client, type ClientEvents } from 'discord.js';
import type InfraContainer from '@packages/infra';
import type { RabbitMessages } from '@packages/infra';
import LibContainer from '@packages/libs';

abstract class BotBase extends Base {
	readonly events: {
		discord: EventEmitter;
		internal: EventEmitter<RabbitMessages>;
	};
	constructor(
		readonly rest: REST,
		readonly client: Client<true>,
		readonly db: InstanceType<(typeof DBContainer)['discordBot']>,
		readonly libs: LibContainer,
		readonly infra: InfraContainer,
		eventEmitter: EventEmitter<RabbitMessages>,
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
