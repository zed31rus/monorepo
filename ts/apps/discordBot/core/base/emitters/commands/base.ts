import BaseEmitter, { type BaseEmitterArgs } from '../base.js';

export default abstract class BaseCommandEmitter extends BaseEmitter {
	constructor(...baseEmitterArgs: BaseEmitterArgs) {
		super(...baseEmitterArgs);
	}
}

export type BaseCommandEmitterArgs = ConstructorParameters<typeof BaseCommandEmitter>;
