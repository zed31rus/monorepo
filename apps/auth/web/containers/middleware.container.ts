import AuthMiddleware from '#web/middleware/auth.middleware.js';
import FileMiddleware from '#web/middleware/file.middleware.js';

class MiddlewareContainer {
	constructor(
		readonly auth: AuthMiddleware,
		readonly file: FileMiddleware
	) {}
}

export type MiddlewareContainerArgs = ConstructorParameters<typeof MiddlewareContainer>;

export default MiddlewareContainer;
