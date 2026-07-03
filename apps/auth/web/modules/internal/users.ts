import BaseWebModule from '#web/base/module.js';
import type { UserEnv } from '#web/types/Env.js';

export type UsersInternalEnv = UserEnv & {};

export default class UsersInternalModule extends BaseWebModule<UsersInternalEnv> {
	init() {
		this.router.openapi(this.openapi.internal.users.getByUuid, async (c) => {
			const { uuid } = c.req.valid('param');
			const { provider } = c.req.valid('json');
			const user = await this.core.services.users.getInternalByUuid(uuid, provider);
			return c.json({ user });
		});
	}
}
