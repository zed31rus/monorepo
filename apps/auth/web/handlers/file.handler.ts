import baseHandler from "#web/base/handler.base.js";
import { type AvatarEnv } from "#web/types/Env.d.js";
import DbContainer from "@packages/db";

export default class FileHandler extends baseHandler {

    public ValidAvatar<T extends AvatarEnv>(params: { user: DbContainer.authDB.User.Public}) { 
        return this.createFactory<T>().createHandlers( this.wrapper.validator.validate('form', this.dto.file.avatarSchema),
        this.middleware.file.withAvatar<T>(params.user));
    }
};
