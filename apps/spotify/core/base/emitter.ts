import type InstancesContainer from '#core/containers/instances.js';
import type ManagerContainer from '#core/containers/managers.js';
import type ServicesContainer from '#core/containers/services.js';
import CoreBase, { type CoreBaseArgs } from './core.js';

abstract class BaseEmitter extends CoreBase {
	constructor(
		protected readonly services: ServicesContainer,
		protected readonly instances: InstancesContainer,
		protected readonly managers: ManagerContainer,
		...coreBaseArgs: CoreBaseArgs
	) {
		super(...coreBaseArgs);
		this.emitter();
	}

	protected abstract emitter(): void;
}

export type BaseEmitterArgs = ConstructorParameters<typeof BaseEmitter>;

export default BaseEmitter;
