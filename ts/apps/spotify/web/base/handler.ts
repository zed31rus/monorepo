import WebWrapperContainer from '#web/containers/wrapper.js';
import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseWebHandler extends WebBase {
	constructor(
		protected readonly wrappers: WebWrapperContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}
}

export type BaseWebHandlerArgs = ConstructorParameters<typeof BaseWebHandler>;

export default BaseWebHandler;
