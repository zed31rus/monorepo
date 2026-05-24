import { type ServerType } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import WebManagerContainer from '#web/containers/managers.container.js';
import ModuleContainer from '#web/containers/module.container.js';
import HandlerContainer from '#web/containers/handler.container.js';
import WrapperContainer from '#web/containers/wrapper.container.js';
import WebBase, { type WebBaseArgs } from './web.base.js';

abstract class BaseServer extends WebBase {
	constructor(
		protected readonly server: OpenAPIHono,
		protected readonly webManager: WebManagerContainer,
		protected readonly module: ModuleContainer,
		protected readonly handler: HandlerContainer,
		protected readonly wrapper: WrapperContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract configureWebServer(): any;
	abstract startWebServer(port: number): ServerType;
}

export type BaseServerArgs = ConstructorParameters<typeof BaseServer>;

export default BaseServer;
