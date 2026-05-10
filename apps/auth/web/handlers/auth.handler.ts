import baseHandler from "#web/base/handler.base.js";
import { type UserEnv } from "#web/types/Env.d.js";

export default class AuthHandler extends baseHandler {
    public withValidUser<T extends UserEnv>() {
        return this.createFactory<T>().createHandlers( this.wrapper.validator.validate('cookie', this.dto.cookie.required.access),
        this.middleware.auth.withUser<T>());
    }

    public withOptionalUser<T extends UserEnv>() {
        return this.createFactory<T>().createHandlers( this.wrapper.validator.validate('cookie', this.dto.cookie.optional.access),
        this.middleware.auth.withOptionalUser<T>());
    }
    
}