import BaseWebModule from '#web/base/module.js';
import { type OptionalUserEnv } from '#root/web/types/Env.js';

type DiscordOauthMainEnv = OptionalUserEnv & {};

export default class DiscordOauthExternalModule extends BaseWebModule<DiscordOauthMainEnv> {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 100));

		this.router.openapi(this.openapi.external.oauth.discord.callback, async (c) => {
			const { code } = c.req.valid('query');
			const publicUser = c.get('user');

			this.logger.info(`Discord OAuth callback request: hasPublicUser=${!!publicUser}`);

			const { user, refresh, access } = await this.core.services.oauth.discord.callback(
				code,
				publicUser
			);

			this.logger.info(`Discord OAuth callback success: userId=${user.uuid}`);

			this.webManagers.session.sendSession(c, refresh);

			return c.json({
				user: user,
				accessToken: access.token,
				expires: access.expires.atTime,
			});
		});
	}
}
