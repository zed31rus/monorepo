import { type UserEnv } from '#web/types/Env.js';
import BaseModule from '#web/base/module.base.js';

type ProfileMainEnv = UserEnv & {};

export default class MeExternalModule extends BaseModule<ProfileMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 100));

		this.router.openapi(this.openapis.external.me.get, async (c) => {
			const publicUser = c.get('user');
			const { user } = await this.core.services.me.get(publicUser);
			return c.json({ user });
		});
	}
}
