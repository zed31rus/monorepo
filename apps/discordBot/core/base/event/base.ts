import type SingletonManagerContainer from '#core/containers/manager.js';
import type RegistryContainer from '#core/containers/registry.js';
import type ServiceContainer from '#core/containers/service.js';
import BotBase, { type BotBaseArgs } from '../bot.js';

export default abstract class BaseEvent extends BotBase {
	constructor(
		readonly service: ServiceContainer,
		readonly registries: RegistryContainer,
		readonly singletonManagers: SingletonManagerContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
	}
}

export type BaseEventArgs = ConstructorParameters<typeof BaseEvent>;
