import BaseHandler from '#web/base/handler.base.js';
import { type UserEnv } from '#web/types/Env.d.js';

export default class AuthHandler extends BaseHandler {
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
