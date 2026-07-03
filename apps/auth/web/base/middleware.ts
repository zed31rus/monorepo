import WebDtoContainer from '#web/containers/dto.js';
import WebWrapperContainer from '#web/containers/wrapper.js';
import WebManagerContainer from '#web/containers/managers.js';
import { type Env } from 'hono';
import { createFactory } from 'hono/factory';
import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseWebMiddleware extends WebBase {
	constructor(
		protected readonly dto: WebDtoContainer,
		protected readonly wrappers: WebWrapperContainer,
		protected readonly webManagers: WebManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	protected createFactory<T extends Env>() {
		return createFactory<T>();
	}
}

export type BaseWebMiddlewareArgs = ConstructorParameters<typeof BaseWebMiddleware>;

export default BaseWebMiddleware;
