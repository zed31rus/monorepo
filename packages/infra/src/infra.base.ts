import Base, { type BaseArgs } from '@zed31rus/base';

abstract class BaseInfra extends Base {
	constructor(...baseArgs: BaseArgs) {
		super(...baseArgs);
	}
}

export type BaseInfraArgs = ConstructorParameters<typeof BaseInfra>;

export default BaseInfra;
