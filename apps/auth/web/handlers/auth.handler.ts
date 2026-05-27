import BaseHandler from '#web/base/handler.base.js';
import { type UserEnv } from '#web/types/Env.d.js';

export default class AuthHandler extends BaseHandler {
	public withValidUser<T extends UserEnv>() {
		return this.createFactory<T>().createHandlers(
			this.wrappers.validator.validate('cookie', this.dtos.cookie.required.access),
			this.middlewares.auth.withUser<T>()
		);
	}

	public withOptionalUser<T extends UserEnv>() {
		return this.createFactory<T>().createHandlers(
			this.wrappers.validator.validate('cookie', this.dtos.cookie.optional.access),
			this.middlewares.auth.withOptionalUser<T>()
		);
	}
}
