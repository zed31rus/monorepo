import CoreBase, { type CoreBaseArgs } from './core.js';

abstract class BaseManager extends CoreBase {
	constructor(...coreBaseArgs: CoreBaseArgs) {
		super(...coreBaseArgs);
	}
}

export type BaseManagerArgs = ConstructorParameters<typeof BaseManager>;

export default BaseManager;
