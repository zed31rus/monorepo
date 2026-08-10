import type InstanceContaner from '#core/containers/instance.js';
import type SingletonManagerContainer from '#core/containers/manager.js';
import type RegistryContainer from '#core/containers/registry.js';
import BotBase, { type BotBaseArgs } from './bot.js';

abstract class BaseService extends BotBase {
	constructor(
		readonly instances: InstanceContaner,
		readonly registries: RegistryContainer,
		readonly singletonManagers: SingletonManagerContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
	}

	abstract init(): Promise<void>;
}

export type BaseServiceArgs = ConstructorParameters<typeof BaseService>;

export default BaseService;
