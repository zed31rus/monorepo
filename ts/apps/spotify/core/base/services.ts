import type InstancesContainer from '../containers/instances.js';
import type ManagerContainer from '../containers/managers.js';
import CoreBase, { type CoreBaseArgs } from './core.js';

abstract class BaseService extends CoreBase {
	constructor(
		protected readonly instances: InstancesContainer,
		protected readonly managers: ManagerContainer,
		...coreBaseArgs: CoreBaseArgs
	) {
		super(...coreBaseArgs);
	}
}

export type BaseServiceArgs = ConstructorParameters<typeof BaseService>;

export default BaseService;
