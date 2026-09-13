import Base, { type BaseArgs } from '@zed31rus/base';

abstract class BaseLib extends Base {
	constructor(...baseArgs: BaseArgs) {
		super(...baseArgs);
	}
}

export type BaseLibArgs = ConstructorParameters<typeof BaseLib>;

export default BaseLib;
