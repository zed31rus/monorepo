import DtoContainer from '#web/containers/dto.container.js';
import HandlerContainer from '#web/containers/handler.container.js';
import MiddlewareContainer from '#web/containers/middleware.container.js';
import WebBase, { type WebBaseArgs } from './web.base.js';

abstract class BaseOpenAPI extends WebBase {
	constructor(
		protected readonly dto: DtoContainer,
		protected readonly middleware: MiddlewareContainer,
		protected readonly handler: HandlerContainer,
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

export type BaseOpenAPIArgs = ConstructorParameters<typeof BaseOpenAPI>;

export default BaseOpenAPI;
