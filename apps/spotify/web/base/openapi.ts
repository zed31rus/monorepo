import type HandlerContainer from '#web/containers/handler.js';
import type WrapperContainer from '#web/containers/wrapper.js';
import WebBase, { type WebBaseArgs } from './web.js';

abstract class BaseOpenAPI extends WebBase {
	constructor(
		protected readonly handlers: HandlerContainer,
		protected readonly wrappers: WrapperContainer,
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
