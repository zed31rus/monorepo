import BaseModule from '#root/web/base/module.base.js';
import { type OptionalUserEnv } from '#root/web/types/Env.js';

type DiscordOauthMainEnv = OptionalUserEnv & {};

export default class DiscordOauthMainModule extends BaseModule<DiscordOauthMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 100));

		this.router.openapi(this.openapis.oauth.discord.callback, async (c) => {
			const { code } = c.req.valid('query');
			const publicUser = c.get('user');

			const { user, refresh, access } = await this.core.services.oauth.discord.callback(
				code,
				publicUser
			);

			this.webManagers.session.sendSession(c, refresh);

			return c.json({
				user: user,
				accessToken: access.token,
				expires: access.expires.atTime,
			});
		});
	}
}
