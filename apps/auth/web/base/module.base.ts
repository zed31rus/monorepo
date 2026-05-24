import { OpenAPIHono } from '@hono/zod-openapi';
import { type Env } from 'hono';
import { createFactory } from 'hono/factory';
import { type OptionalUserEnv } from '#web/types/Env.js';
import DtoContainer from '#web/containers/dto.container.js';
import WrapperContainer from '#web/containers/wrapper.container.js';
import WebManagerContainer from '#web/containers/managers.container.js';
import HandlerContainer from '#web/containers/handler.container.js';
import MiddlewareContainer from '#web/containers/middleware.container.js';
import OpenAPIContainer from '#web/containers/openapi.container.js';
import WebBase, { type WebBaseArgs } from './web.base.js';

abstract class BaseModule<T extends OptionalUserEnv> extends WebBase {
	public router = new OpenAPIHono<T>();

	constructor(
		protected readonly dto: DtoContainer,
		protected readonly wrapper: WrapperContainer,
		protected readonly webManager: WebManagerContainer,
		protected readonly handler: HandlerContainer,
		protected readonly middleware: MiddlewareContainer,
		protected readonly openapi: OpenAPIContainer,
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

export type BaseModuleArgs = ConstructorParameters<typeof BaseModule>;

export default BaseModule;
