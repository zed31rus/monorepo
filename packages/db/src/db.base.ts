import Base, { type BaseArgs } from '@zed31rus/base';

abstract class BaseDb extends Base {
	constructor(...baseArgs: BaseArgs) {
		super(...baseArgs);
	}
}

export type BaseDbArgs = ConstructorParameters<typeof BaseDb>;

export default BaseDb;
