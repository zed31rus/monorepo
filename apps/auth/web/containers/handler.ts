import AuthWebHandler from '#web/handlers/auth.js';
import ErrorWebHandler from '#web/handlers/error.js';
import FileWebHandler from '#web/handlers/file.js';

class WebHandlerContainer {
	constructor(
		readonly auth: AuthWebHandler,
		readonly file: FileWebHandler,
		readonly error: ErrorWebHandler
	) {}
}

export default WebHandlerContainer;
