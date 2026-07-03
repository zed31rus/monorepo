import AuthWebMiddleware from '#web/middleware/auth.js';
import FileWebMiddleware from '#web/middleware/file.js';

class WebMiddlewareContainer {
	constructor(
		readonly auth: AuthWebMiddleware,
		readonly file: FileWebMiddleware
	) {}
}

export default WebMiddlewareContainer;
