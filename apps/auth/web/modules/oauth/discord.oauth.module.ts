import BaseModule from "#root/web/base/module.base.js";
import { type OptionalUserEnv } from "#root/web/types/Env.js";

type DiscordOauthEnv = OptionalUserEnv & {};

export default class DiscordOauthModule extends BaseModule<DiscordOauthEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 100))

        this.router.openapi(
            this.openapi.oauth.discord.callback,
            async (c) => {
                const { code } = c.req.valid('query');
                const publicUser = c.get('user');
                
                const { user, refresh, access } = await this.core.services.oauth.discord.callback(code, publicUser);

                this.webManager.session.sendSession(c, refresh)

                return c.json({
                    user: user,
                    accessToken: access.token,
                    expires: access.expires.atTime
                })
            }
        )
    }
}
