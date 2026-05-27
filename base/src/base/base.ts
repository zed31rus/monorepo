import type ConfigContainer from '@shared/config';
import type ErrorsContainer from '@shared/errors';
import type Logger from '@shared/logger';

abstract class Base {
	constructor(
		readonly config: ConfigContainer,
		readonly logger: Logger['appLogger'],
		readonly errors: ErrorsContainer
	) {}
}

export type BaseArgs = ConstructorParameters<typeof Base>;

export default Base;
