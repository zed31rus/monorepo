import { OpenAPIHono } from '@hono/zod-openapi';
import OpenAPIContainer from '#web/containers/openapi.js';
import WebBase, { type WebBaseArgs } from './web.js';
import type WebWrapperContainer from '#web/containers/wrapper.js';
import type WebHandlerContainer from '#web/containers/handler.js';

abstract class BaseWebModule extends WebBase {
	public router = new OpenAPIHono();

	constructor(
		protected readonly openapi: OpenAPIContainer,
		protected readonly handlers: WebHandlerContainer,
		protected readonly wrappers: WebWrapperContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
		this.init();
	}

	protected abstract init(): void;
}

export type BaseWebModuleArgs = ConstructorParameters<typeof BaseWebModule>;

export default BaseWebModule;
