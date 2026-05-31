import { type ServerType } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import WebManagerContainer from '#web/containers/managers.container.js';
import HandlerContainer from '#web/containers/handler.container.js';
import WrapperContainer from '#web/containers/wrapper.container.js';
import WebBase, { type WebBaseArgs } from './web.base.js';
import type DtoContainer from '#web/containers/dto.container.js';
import type MiddlewareContainer from '#web/containers/middleware.container.js';
import type OpenAPIContainer from '#web/containers/openapi.container.js';
import type ModuleContainer from '#web/containers/module.container.js';

abstract class BaseServer extends WebBase {
	constructor(
		protected readonly server: OpenAPIHono,
		protected readonly modules: ModuleContainer,
		protected readonly openapis: OpenAPIContainer,
		protected readonly handlers: HandlerContainer,
		protected readonly middlewares: MiddlewareContainer,
		protected readonly dtos: DtoContainer,
		protected readonly wrappers: WrapperContainer,
		protected readonly webManagers: WebManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract configure(): any;
	abstract start(port: number): ServerType;
}

export type BaseServerArgs = ConstructorParameters<typeof BaseServer>;

export default BaseServer;
