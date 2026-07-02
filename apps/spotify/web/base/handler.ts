import WrapperContainer from '#web/containers/wrapper.js';
import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseHandler extends WebBase {
	constructor(
		protected readonly wrappers: WrapperContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}
}

export type BaseHandlerArgs = ConstructorParameters<typeof BaseHandler>;

export default BaseHandler;
