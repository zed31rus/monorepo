import DtoContainer from '#web/containers/dto.container.js';
import WrapperContainer from '#web/containers/wrapper.container.js';
import WebManagerContainer from '#web/containers/managers.container.js';
import { type Env } from 'hono';
import { createFactory } from 'hono/factory';
import WebBase, { type WebBaseArgs } from './web.base.js';

abstract class BaseMiddleware extends WebBase {
	constructor(
		protected readonly dto: DtoContainer,
		protected readonly wrappers: WrapperContainer,
		protected readonly webManagers: WebManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	protected createFactory<T extends Env>() {
		return createFactory<T>();
	}
}

export type BaseMiddlewareArgs = ConstructorParameters<typeof BaseMiddleware>;

export default BaseMiddleware;
