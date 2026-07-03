import WebDtoContainer from '#web/containers/dto.js';
import WebHandlerContainer from '#web/containers/handler.js';
import type WebManagerContainer from '#web/containers/managers.js';
import WebMiddlewareContainer from '#web/containers/middleware.js';
import type WebWrapperContainer from '#web/containers/wrapper.js';
import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseWebOpenAPI extends WebBase {
	constructor(
		protected readonly handlers: WebHandlerContainer,
		protected readonly middlewares: WebMiddlewareContainer,
		protected readonly dto: WebDtoContainer,
		protected readonly wrappers: WebWrapperContainer,
		protected readonly managers: WebManagerContainer,
		...webBaseArgs: WebBaseArgs
	) {
		super(...webBaseArgs);
	}

	protected commonResponses = {
		400: { description: 'Bad request' },
		401: { description: 'Unauthorized' },
		403: { description: 'Forbidden' },
		404: { description: 'Not found' },
		409: { description: 'Conflict' },
		422: { description: 'Validation error' },
		429: { description: 'Too many requests' },
		500: { description: 'Internal server error' },
	};
}

export type BaseWebOpenAPIArgs = ConstructorParameters<typeof BaseWebOpenAPI>;

export default BaseWebOpenAPI;
