import ErrorsContainer from '@shared/errors';

abstract class BaseConfig {
	constructor(readonly errors: ErrorsContainer) {}
}

export type BaseConfigArgs = ConstructorParameters<typeof BaseConfig>;

export default BaseConfig;
