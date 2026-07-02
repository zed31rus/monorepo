import type { CoreBaseArgs } from './core.js';
import CoreBase from './core.js';

abstract class BaseInstance extends CoreBase {
	constructor(...coreBaseArgs: CoreBaseArgs) {
		super(...coreBaseArgs);
	}
}

export type BaseInstanceArgs = ConstructorParameters<typeof BaseInstance>;

export default BaseInstance;
