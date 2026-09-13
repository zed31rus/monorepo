import { type ServerType } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import WebWrapperContainer from '#web/containers/wrapper.js';
import WebBase, { type WebBaseArgs } from './web.js';
import type OpenAPIContainer from '#web/containers/openapi.js';
import type WebModuleContainer from '#web/containers/module.js';
import type WebHandlerContainer from '#web/containers/handler.js';

abstract class BaseWebServer extends WebBase {
	constructor(
		protected readonly server: OpenAPIHono,
		protected readonly modules: WebModuleContainer,
		protected readonly openapi: OpenAPIContainer,
		protected readonly handlers: WebHandlerContainer,
		protected readonly wrappers: WebWrapperContainer,
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
