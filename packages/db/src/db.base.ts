import Base from '@zed31rus/base';

abstract class BaseDb extends Base {
	constructor(...baseArgs: Base.Args) {
		super(...baseArgs);
	}
}

export type BaseDbArgs = ConstructorParameters<typeof BaseDb>;

export default BaseDb;
