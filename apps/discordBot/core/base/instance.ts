import BotBase, { type BotBaseArgs } from './bot.js';

export default abstract class BaseInstance extends BotBase {
	constructor(...botBaseArgs: BotBaseArgs) {
		super(...botBaseArgs);
	}
}

export type BaseInstanceArgs = ConstructorParameters<typeof BaseInstance>;
