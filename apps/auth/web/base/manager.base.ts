import WebBase, { type WebBaseArgs } from './web.base.js';

abstract class BaseWebManager extends WebBase {
	constructor(...webBaseArgs: WebBaseArgs) {
		super(...webBaseArgs);
	}
}

export type BaseWebManagerArgs = ConstructorParameters<typeof BaseWebManager>;

export default BaseWebManager;
