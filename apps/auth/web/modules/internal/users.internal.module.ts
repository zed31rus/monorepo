import BaseModule from '#web/base/module.base.js';
import type { UserEnv } from '#web/types/Env.js';

export type UsersInternalEnv = UserEnv & {};

export default class UsersInternalModule extends BaseModule<UsersInternalEnv> {
	init() {
		this.router.openapi(this.openapis.internal.users.getByUuid, async (c) => {
			const { uuid } = c.req.valid('param');
			const user = await this.core.services.users.getByUuid(uuid, true);
			return c.json({ user });
		});
	}
}
