import { type UserEnv } from '#web/types/Env.js';
import BaseModule from '#web/base/module.base.js';

export type AccountMainEnv = UserEnv & {};

export default class AccountMainModule extends BaseModule<AccountMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 10));

		this.router.openapi(this.openapis.account.emailVerificationSend, async (c) => {
			const publicUser = c.get('user');
			const { user } = await this.core.services.account.emailVerificationSend(publicUser);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.account.emailVerificationConfirm, async (c) => {
			const publicUser = c.get('user');
			const { submitCode } = c.req.valid('json');
			const { user } = await this.core.services.account.emailVerificationConfirm(
				publicUser,
				submitCode
			);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.account.changePasswordRequest, async (c) => {
			const publicUser = c.get('user');
			const { user } = await this.core.services.account.changePasswordRequest(publicUser);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.account.changePasswordConfirm, async (c) => {
			const publicUser = c.get('user');
			const { password, submitCode } = c.req.valid('json');
			const { user } = await this.core.services.account.changePasswordConfirm(
				publicUser,
				password,
				submitCode
			);
			return c.json({ user });
		});
	}
}
