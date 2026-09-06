import type RegistryContainer from '#core/containers/registry.js';
import type InstanceContaner from '#core/containers/instance.js';
import type SingletonManagerContainer from '#core/containers/manager.js';
import BotBase, { type BotBaseArgs } from './bot.js';
import type ServiceContainer from '#core/containers/service.js';

export default abstract class BaseDeployer extends BotBase {
	constructor(
		readonly services: ServiceContainer,
		readonly instances: InstanceContaner,
		readonly registries: RegistryContainer,
		readonly singletonManagers: SingletonManagerContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
	}
}

export type BaseDeployerArgs = ConstructorParameters<typeof BaseDeployer>;
