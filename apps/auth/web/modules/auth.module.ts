import { type UserEnv } from "#web/types/Env.js";
import BaseModule from "#web/base/module.base.js";

type AuthEnv = UserEnv & {}

export default class AuthModule extends BaseModule<AuthEnv> {

    init() {

        this.router.use(this.wrapper.rateLimiter.limit(15 * 60 * 1000, 20));

        this.router.openapi(
        this.openapi.auth.register,
        async (c) => {
            
            const { login, email, password, nickname } = c.req.valid('json');
            const { user } = await this.core.services.auth.register(login, email, password, nickname);
            return c.json({ user });
        });


        this.router.openapi(
        this.openapi.auth.login,
        async (c) => {

            const { email, password } = c.req.valid('json');
            const { user, refresh, access } = await this.core.services.auth.login(email, password);
            this.webManager.session.sendSession(c, refresh);
            return c.json({
                user: user,
                accessToken: access.token,
                expires: access.expires.atTime
            })
        });


        this.router.openapi(
        this.openapi.auth.refresh,
        async (c) => {
            
            const { refreshToken } = c.req.valid('cookie');
            const { user, refresh, access } = await this.core.services.auth.refresh(refreshToken);
            this.webManager.session.sendSession(c, refresh);
            return c.json({
                user: user,
                accessToken: access.token,
                expires: access.expires.atTime
            })
        });


        this.router.openapi(
        this.openapi.auth.logout,
        async (c) => {
            
            this.webManager.session.deleteSession(c);
            const {refreshToken} = c.req.valid('cookie');
            if (refreshToken) await this.core.services.auth.logOut(refreshToken);
            return c.json({}, 200);
        });
    }

}
