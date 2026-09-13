import AuthWebMiddleware from '#web/middleware/auth.js';

class WebMiddlewareContainer {
	constructor(readonly auth: AuthWebMiddleware) {}
}

export default WebMiddlewareContainer;
