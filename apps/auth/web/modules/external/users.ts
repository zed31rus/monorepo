import { type UserEnv } from '#web/types/Env.js';
import BaseWebModule from '#web/base/module.js';

type UsersMainEnv = UserEnv & {};

export default class UsersExternalModule extends BaseWebModule<UsersMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 100));

		this.router.openapi(this.openapi.external.users.getByUuid, async (c) => {
			const { uuid } = c.req.valid('param');
			const user = await this.core.services.users.getByUuid(uuid);
			return c.json({ user });
		});

		this.router.openapi(this.openapi.external.users.getByEmail, async (c) => {
			const { email } = c.req.valid('param');
			const user = await this.core.services.users.getByEmail(email);
			return c.json({ user });
		});

		this.router.openapi(this.openapi.external.users.getByLogin, async (c) => {
			const { login } = c.req.valid('param');
			const user = await this.core.services.users.getByLogin(login);
			return c.json({ user });
		});
	}
}
