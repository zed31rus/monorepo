import { type ServerType } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import WrapperContainer from '#web/containers/wrapper.js';
import WebBase, { type WebBaseArgs } from './web.js';
import type OpenAPIContainer from '#web/containers/openapi.js';
import type ModuleContainer from '#web/containers/module.js';
import type HandlerContainer from '#web/containers/handler.js';

abstract class BaseServer extends WebBase {
	constructor(
		protected readonly server: OpenAPIHono,
		protected readonly modules: ModuleContainer,
		protected readonly openapi: OpenAPIContainer,
		protected readonly handlers: HandlerContainer,
		protected readonly wrappers: WrapperContainer,
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
