import { OpenAPIHono } from '@hono/zod-openapi';
import OpenAPIContainer from '#web/containers/openapi.js';
import WebBase, { type WebBaseArgs } from './web.js';
import type WrapperContainer from '#web/containers/wrapper.js';
import type HandlerContainer from '#web/containers/handler.js';

abstract class BaseModule extends WebBase {
	public router = new OpenAPIHono();

	constructor(
		protected readonly openapi: OpenAPIContainer,
		protected readonly handlers: HandlerContainer,
		protected readonly wrappers: WrapperContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
		this.init();
	}

	protected abstract init(): void;
}

export type BaseModuleArgs = ConstructorParameters<typeof BaseModule>;

export default BaseModule;
