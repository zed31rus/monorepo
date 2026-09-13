import BotBase, { type BotBaseArgs } from './bot.js';

abstract class BaseRegistry extends BotBase {
	constructor(...botBaseArgs: BotBaseArgs) {
		super(...botBaseArgs);
	}
}

export type BaseRegistryArgs = ConstructorParameters<typeof BaseRegistry>;

export default BaseRegistry;
