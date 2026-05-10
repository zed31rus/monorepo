import BaseService from "#core/base/service.base.js";
import DbContainer from "@packages/db";

export default class MeService extends BaseService {

    async get(publicUser: DbContainer.authDB.User.Public): Promise<{user: DbContainer.authDB.User.Personal}> {
        const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
        const personalUser = this.db.users.toPersonalJSON(rawUser)
        return { user: personalUser }
    }

}