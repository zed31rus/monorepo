import AuthWebHandler from '#web/handlers/auth.js';
import ErrorWebHandler from '#web/handlers/error.js';

class WebHandlerContainer {
	constructor(
		readonly auth: AuthWebHandler,
		readonly error: ErrorWebHandler
	) {}
}

export default WebHandlerContainer;
