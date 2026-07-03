import { type ServerType } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import WebManagerContainer from '#web/containers/managers.js';
import WebHandlerContainer from '#web/containers/handler.js';
import WebWrapperContainer from '#web/containers/wrapper.js';
import WebBase, { type WebBaseArgs } from './web.js';
import type WebDtoContainer from '#web/containers/dto.js';
import type WebMiddlewareContainer from '#web/containers/middleware.js';
import type WebOpenAPIContainer from '#web/containers/openapi.js';
import type WebModuleContainer from '#web/containers/module.js';

abstract class BaseWebServer extends WebBase {
	constructor(
		protected readonly server: OpenAPIHono,
		protected readonly modules: WebModuleContainer,
		protected readonly openapi: WebOpenAPIContainer,
		protected readonly handlers: WebHandlerContainer,
		protected readonly middlewares: WebMiddlewareContainer,
		protected readonly dto: WebDtoContainer,
		protected readonly wrappers: WebWrapperContainer,
		protected readonly webManagers: WebManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract configure(): any;
	abstract start(port: number): ServerType;
}

export type BaseWebServerArgs = ConstructorParameters<typeof BaseWebServer>;

export default BaseWebServer;
