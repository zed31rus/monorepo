import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseWebWrapper extends WebBase {
	constructor(...webBaseArgs: WebBaseArgs) {
		super(...webBaseArgs);
	}
}

export type BaseWebWrapperArgs = ConstructorParameters<typeof BaseWebWrapper>;

export default BaseWebWrapper;
