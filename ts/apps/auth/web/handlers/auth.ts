import BaseWebHandler from '#web/base/handler.js';
import { type UserEnv } from '#web/types/Env.js';

export default class AuthWebHandler extends BaseWebHandler {
	public withValidUser<T extends UserEnv>() {
		return this.createFactory<T>().createHandlers(this.middlewares.auth.withUser<T>());
	}

	public withOptionalUser<T extends UserEnv>() {
		return this.createFactory<T>().createHandlers(this.middlewares.auth.withOptionalUser<T>());
	}

	public withInternal() {
		return this.createFactory().createHandlers(this.middlewares.auth.withInternal());
	}
}
