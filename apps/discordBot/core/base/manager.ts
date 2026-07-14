import BotBase, { type BotBaseArgs } from './bot.js';

abstract class BaseManager extends BotBase {
	constructor(...botBaseArgs: BotBaseArgs) {
		super(...botBaseArgs);
	}
}

export type BaseManagerArgs = ConstructorParameters<typeof BaseManager>;

export default BaseManager;
