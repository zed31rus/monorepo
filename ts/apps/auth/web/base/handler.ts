import WebMiddlewareContainer from '#web/containers/middleware.js';
import WebDtoContainer from '#web/containers/dto.js';
import ManagerContainer from '#web/containers/managers.js';
import WebWrapperContainer from '#web/containers/wrapper.js';
import { type Env } from 'hono';
import { createFactory } from 'hono/factory';
import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseWebHandler extends WebBase {
	constructor(
		protected readonly middlewares: WebMiddlewareContainer,
		protected readonly dto: WebDtoContainer,
		protected readonly wrappers: WebWrapperContainer,
		protected readonly managers: ManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	protected createFactory<T extends Env>() {
		return createFactory<T>();
	}
}

export type BaseWebHandlerArgs = ConstructorParameters<typeof BaseWebHandler>;

export default BaseWebHandler;
