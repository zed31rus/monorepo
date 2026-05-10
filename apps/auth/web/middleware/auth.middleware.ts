import baseMiddleware from "#web/base/middleware.base.js";
import { getCookie } from "hono/cookie";
import { type OptionalUserEnv, type UserEnv } from "#web/types/Env.js";
import LibContainer from "@packages/libs";

export default class AuthMiddleware extends baseMiddleware {

    public withUser<T extends UserEnv>() { 
        return this.createFactory<T>().createMiddleware( async (c, next) => {
            const Authorization = c.req.header('Authorization');
            const accessToken = Authorization?.replace('Bearer ', '')

            if (!accessToken) throw this.errors.api.Unauthorized();

            const publicUser = await this.core.libs.jwt.verify(accessToken, this.config.env.JWT_SECRET);

            c.set('user',publicUser);

            await next();
        });
    }

    public withOptionalUser<T extends OptionalUserEnv>() {
        return this.createFactory<T>().createMiddleware( async (c, next) => {
            const Authorization = c.req.header('Authorization');
            const accessToken = Authorization?.replace('Bearer', '')

            let publicUser = null;
            if (accessToken) {
                publicUser = await this.core.libs.jwt.verify(accessToken, this.config.env.JWT_SECRET);
            }

            c.set('user',publicUser);

            await next();
        });
    }
};
