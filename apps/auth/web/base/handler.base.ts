import MiddlewareContainer from '#web/containers/middleware.container.js';
import DtoContainer from '#web/containers/dto.container.js';
import ManagerContainer from '#web/containers/managers.container.js';
import WrapperContainer from '#web/containers/wrapper.container.js';
import { type Env } from 'hono';
import { createFactory } from 'hono/factory';
import WebBase, { type WebBaseArgs } from './web.base.js';

abstract class BaseHandler extends WebBase {
	constructor(
		protected readonly middlewares: MiddlewareContainer,
		protected readonly dto: DtoContainer,
		protected readonly wrappers: WrapperContainer,
		protected readonly managers: ManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	protected createFactory<T extends Env>() {
		return createFactory<T>();
	}
}

export type BaseHandlerArgs = ConstructorParameters<typeof BaseHandler>;

export default BaseHandler;
