import Base, { type BaseArgs } from '@zed31rus/base';
import { EventEmitter } from 'events';
import DBContainer from '@packages/db';
import { type Client } from 'discord.js';
import type InfraContainer from '@packages/infra';

abstract class BotBase extends Base {
	events: EventEmitter;
	constructor(
		readonly client: Client<true>,
		readonly db: InstanceType<typeof DBContainer>['discordBot'],
		readonly infra: InfraContainer,
		...baseArgs: BaseArgs
	) {
		super(...baseArgs);
		this.events = this.client as EventEmitter;
	}
}

export type BotBaseArgs = ConstructorParameters<typeof BotBase>;

export default BotBase;
