import BaseModule from '#web/base/module.base.js';
import type { UserEnv } from '#web/types/Env.js';

export type UsersInternalEnv = UserEnv & {};

export default class UsersInternalModule extends BaseModule<UsersInternalEnv> {
	init() {
		this.router.openapi(this.openapi.internal.users.getByUuid, async (c) => {
			const { uuid } = c.req.valid('param');
			const { provider } = c.req.valid('json');
			const user = await this.core.services.users.getInternalByUuid(uuid, provider);
			return c.json({ user });
		});
	}
}
