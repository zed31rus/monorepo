import WebBase, { type WebBaseArgs } from './web.base.js';

abstract class BaseWrapper extends WebBase {
	constructor(...webBaseArgs: WebBaseArgs) {
		super(...webBaseArgs);
	}
}

export type BaseWrapperArgs = ConstructorParameters<typeof BaseWrapper>;

export default BaseWrapper;
