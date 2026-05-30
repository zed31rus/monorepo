import { type UserEnv } from '#web/types/Env.js';
import BaseModule from '#web/base/module.base.js';

type UsersMainEnv = UserEnv & {};

export default class UsersMainModule extends BaseModule<UsersMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 100));

		this.router.openapi(this.openapis.users.getByUuid, async (c) => {
			const { uuid } = c.req.valid('param');
			const user = await this.core.services.users.getByUuid(uuid, false);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.users.getByEmail, async (c) => {
			const { email } = c.req.valid('param');
			const user = await this.core.services.users.getByEmail(email);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.users.getByLogin, async (c) => {
			const { login } = c.req.valid('param');
			const user = await this.core.services.users.getByLogin(login);
			return c.json({ user });
		});
	}
}
