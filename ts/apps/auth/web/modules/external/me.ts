import { type UserEnv } from '#web/types/Env.js';
import BaseWebModule from '#web/base/module.js';

type ProfileMainEnv = UserEnv & {};

export default class MeExternalModule extends BaseWebModule<ProfileMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 100));

		this.router.openapi(this.openapi.external.me.get, async (c) => {
			const publicUser = c.get('user');
			const { user } = await this.core.services.me.get(publicUser);
			return c.json({ user });
		});
	}
}
