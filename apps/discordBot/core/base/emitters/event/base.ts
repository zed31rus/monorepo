import BaseEmitter, { type BaseEmitterArgs } from '../base.js';

export default abstract class BaseEventEmitter extends BaseEmitter {
	constructor(...botBaseArgs: BaseEmitterArgs) {
		super(...botBaseArgs);
	}
}

export type BaseEventArgs = ConstructorParameters<typeof BaseEventEmitter>;
