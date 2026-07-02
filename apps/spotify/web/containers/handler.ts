import type ErrorHandler from '#web/handlers/error.js';

export default class HandlerContainer {
	constructor(readonly error: ErrorHandler) {}
}
