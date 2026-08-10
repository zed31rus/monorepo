import type RegistryContainer from '#core/containers/registry.js';
import BotBase, { type BotBaseArgs } from '../bot.js';
import type ServiceContainer from '#core/containers/service.js';
import type InstanceContaner from '#core/containers/instance.js';
import type SingletonManagerContainer from '#core/containers/manager.js';

export default abstract class BaseEmitter extends BotBase {
	constructor(
		readonly services: ServiceContainer,
		readonly instances: InstanceContaner,
		readonly registry: RegistryContainer,
		readonly singletonManagers: SingletonManagerContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
	}
}

export type BaseEmitterArgs = ConstructorParameters<typeof BaseEmitter>;
