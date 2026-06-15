import BaseMiddleware from '#web/base/middleware.base.js';
import { type OptionalUserEnv, type UserEnv } from '#web/types/Env.js';
import { ApiErrors } from '@shared/errors';

export default class AuthMiddleware extends BaseMiddleware {
	public withUser<T extends UserEnv>() {
		return this.createFactory<T>().createMiddleware(async (c, next) => {
			const authorization = c.req.header('Authorization');
			const accessToken = authorization?.replace('Bearer ', '');

			if (!accessToken)
				throw this.errors.api.unauthorized(ApiErrors.UnauthorizedMessage.TOKEN_MISSING);

			const publicUser = await this.core.libs.jwt.verify(
				accessToken,
				this.config.env.JWT_SECRET
			);

			c.set('user', publicUser);

			await next();
		});
	}

	public withOptionalUser<T extends OptionalUserEnv>() {
		return this.createFactory<T>().createMiddleware(async (c, next) => {
			const authorization = c.req.header('Authorization');
			const accessToken = authorization?.replace('Bearer ', '');

			let publicUser = null;
			if (accessToken) {
				publicUser = await this.core.libs.jwt.verify(
					accessToken,
					this.config.env.JWT_SECRET
				);
			}

			c.set('user', publicUser);

			await next();
		});
	}

	public withInternal() {
		return this.createFactory().createMiddleware(async (c, next) => {
			const internalToken = c.req.header('X-Internal-Token');

			if (!internalToken || internalToken !== this.config.env.INTERNAL_TOKEN) {
				throw this.errors.api.unauthorized(ApiErrors.UnauthorizedMessage.INVALID_TOKEN);
			}

			await next();
		});
	}
}
