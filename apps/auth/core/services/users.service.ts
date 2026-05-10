import BaseService from "#core/base/service.base.js";
import DbContainer from "@packages/db";

export default class UsersService extends BaseService {
    
    async getByUuid(uuid: DbContainer.authDB.User.Public['uuid']): Promise<{user: DbContainer.authDB.User.Public}> {
        const rawUser = await this.db.users.get.orThrow.byUuid(this.db.client, uuid);
        const publicUser = this.db.users.toPublicJSON(rawUser)
        return { user: publicUser }
    }

    async getByEmail(email: DbContainer.authDB.User.Personal['email']): Promise<{user: DbContainer.authDB.User.Public}> {
        const rawUser = await this.db.users.get.orThrow.byEmail(this.db.client, email);
        if (!rawUser.allowEmailFind ) {
            throw this.errors.api.NotFound();
        }
        const publicUser = this.db.users.toPublicJSON(rawUser);
        return { user: publicUser }
    }

    async getByLogin(login: DbContainer.authDB.User.Personal['login']): Promise<{user: DbContainer.authDB.User.Public}> {
        const rawUser = await this.db.users.get.orThrow.byLogin(this.db.client, login);
        if (!rawUser.allowLoginFind ) {
            throw this.errors.api.NotFound();
        }
        const publicUser = this.db.users.toPublicJSON(rawUser);

        return { user: publicUser}
    }

    async getByNickname(nickname: DbContainer.authDB.User.Public['nickname']): Promise<{user: DbContainer.authDB.User.Public}> {
        const rawUser = await this.db.users.get.orThrow.byNick(this.db.client, nickname);
        const publicUser = this.db.users.toPublicJSON(rawUser);
        return { user: publicUser }
    }

}