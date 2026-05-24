import ManagerContainer from '#core/containers/manager.container.js';
import CoreBase, { type CoreBaseArgs } from './core.base.js';

abstract class BaseService extends CoreBase {
	constructor(
		protected readonly manager: ManagerContainer,
		...coreBaseArgs: CoreBaseArgs
	) {
		super(...coreBaseArgs);
	}
}

export type BaseServiceArgs = ConstructorParameters<typeof BaseService>;

export default BaseService;
