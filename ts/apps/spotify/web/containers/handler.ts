import type ErrorWebHandler from '#web/handlers/error.js';

export default class WebHandlerContainer {
	constructor(readonly error: ErrorWebHandler) {}
}
