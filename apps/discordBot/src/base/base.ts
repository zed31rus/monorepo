import Base from '@zed31rus/base';
import { EventEmitter } from 'events';
import DBContainer from '@packages/db';
import { type Client } from 'discord.js';

abstract class BotBase extends Base {
	constructor(
		readonly client: Client<true>,
		readonly events: EventEmitter,
		protected readonly db: InstanceType<typeof DBContainer>['discordBot'],
		...baseArgs: Base.Args
	) {
		super(...baseArgs);
		this.events = this.client as EventEmitter;
	}
}

export type BotBaseArgs = ConstructorParameters<typeof BotBase>;

export default BotBase;
