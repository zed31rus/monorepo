import type RegistryContainer from '#core/containers/registry.js';

import BotBase, { type BotBaseArgs } from '../bot.js';
import type ServiceContainer from '#core/containers/service.js';

export default abstract class BaseCommand extends BotBase {
	constructor(
		readonly services: ServiceContainer,
		readonly registry: RegistryContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
	}
}

export type BaseCommandArgs = ConstructorParameters<typeof BaseCommand>;
