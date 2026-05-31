import BaseModule from '#web/base/module.base.js';
import type { AccountMainEnv } from '#web/openapi/external/account.external.openapi.js';

export default class AccountExternalModule extends BaseModule<AccountMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 10));

		this.router.openapi(this.openapis.external.account.emailVerificationSend, async (c) => {
			const publicUser = c.get('user');
			const { user } = await this.core.services.account.emailVerificationSend(publicUser);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.external.account.emailVerificationConfirm, async (c) => {
			const publicUser = c.get('user');
			const { submitCode } = c.req.valid('json');
			const { user } = await this.core.services.account.emailVerificationConfirm(
				publicUser,
				submitCode
			);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.external.account.changePasswordRequest, async (c) => {
			const publicUser = c.get('user');
			const { user } = await this.core.services.account.changePasswordRequest(publicUser);
			return c.json({ user });
		});

		this.router.openapi(this.openapis.external.account.changePasswordConfirm, async (c) => {
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
