import AuthHandler from '#web/handlers/auth.handler.js';
import ErrorHandler from '#web/handlers/error.handler.js';
import FileHandler from '#web/handlers/file.handler.js';

class HandlerContainer {
	constructor(
		readonly auth: AuthHandler,
		readonly file: FileHandler,
		readonly error: ErrorHandler
	) {}
}

export type HandlerContainerArgs = ConstructorParameters<typeof HandlerContainer>;

export default HandlerContainer;
