import type InstanceContaner from '#core/containers/instance.js';
import type RegistryContainer from '#core/containers/registry.js';
import BotBase, { type BotBaseArgs } from '../bot.js';

export default abstract class BaseManager extends BotBase {
	constructor(
		readonly instances: InstanceContaner,
		readonly registries: RegistryContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
	}
}

export type BaseManagerArgs = ConstructorParameters<typeof BaseManager>;
