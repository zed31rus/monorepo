import CommandContainer from '#core/containers/command.js';
import type RegistryContainer from '#core/containers/registry.js';
import type ServiceContainer from '#core/containers/service.js';
import BotBase, { type BotBaseArgs } from '../../bot.js';

export default abstract class BaseSubcommand extends BotBase {
	abstract command: ConstructorParameters<
		typeof CommandContainer
	>[number][keyof ConstructorParameters<typeof CommandContainer>[number]];

	constructor(
		readonly services: ServiceContainer,
		readonly registry: RegistryContainer,
		readonly commands: CommandContainer,
		...botBaseArgs: BotBaseArgs
	) {
		super(...botBaseArgs);
		this.build();
	}

	abstract build(): void;
}
