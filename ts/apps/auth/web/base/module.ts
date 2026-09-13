import { OpenAPIHono } from '@hono/zod-openapi';
import { type Env } from 'hono';
import { createFactory } from 'hono/factory';
import { type OptionalUserEnv } from '#web/types/Env.js';
import WebDtoContainer from '#web/containers/dto.js';
import WebWrapperContainer from '#web/containers/wrapper.js';
import WebManagerContainer from '#web/containers/managers.js';
import WebHandlerContainer from '#web/containers/handler.js';
import WebMiddlewareContainer from '#web/containers/middleware.js';
import WebOpenAPIContainer from '#web/containers/openapi.js';
import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseWebModule<T extends OptionalUserEnv> extends WebBase {
	public router = new OpenAPIHono<T>();

	constructor(
		protected readonly openapi: WebOpenAPIContainer,
		protected readonly handlers: WebHandlerContainer,
		protected readonly middlewares: WebMiddlewareContainer,
		protected readonly dto: WebDtoContainer,
		protected readonly wrappers: WebWrapperContainer,
		protected readonly webManagers: WebManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
		this.init();
	}

	protected factory<T extends Env>() {
		return createFactory<T>();
	}

	protected abstract init(): void;
}

export type BaseWebModuleArgs = ConstructorParameters<typeof BaseWebModule>;

export default BaseWebModule;
