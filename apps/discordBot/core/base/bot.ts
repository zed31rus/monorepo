import Base, { type BaseArgs } from '@zed31rus/base';
import DBContainer from '@packages/db';
import { REST, type Client } from 'discord.js';
import type InfraContainer from '@packages/infra';

import LibContainer from '@packages/libs';
import type InstanceContaner from '#core/containers/instance.js';

abstract class BotBase extends Base {
	constructor(
		readonly rest: REST,
		readonly client: Client<true>,
		readonly instances: InstanceContaner,
		readonly db: InstanceType<(typeof DBContainer)['discordBot']>,
		readonly libs: LibContainer,
		readonly infra: InfraContainer,

		...baseArgs: BaseArgs
	) {
		super(...baseArgs);
	}
}

export type BotBaseArgs = ConstructorParameters<typeof BotBase>;

export default BotBase;
