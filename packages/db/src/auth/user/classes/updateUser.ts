import authDB from "../../auth.db.js";

export default class UpdateUsers {
    async setAllowLoginFind(client: authDB.TransactionClient, user: authDB.User.Raw, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowLoginFind: allow }
        });
    }
    
    async setAllowEmailFind(client: authDB.TransactionClient, user: authDB.User.Raw, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowEmailFind: allow }
        });
    }

    async setNickname(client: authDB.TransactionClient, user: authDB.User.Raw, nickname: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { nickname }
        });
    }

    async setAvatar(client: authDB.TransactionClient, user: authDB.User.Raw, avatar: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { avatar }
        });
    }

    async setPasswordHash(client: authDB.TransactionClient, user: authDB.User.Raw, passwordHash: string) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { passwordHash }
        });
    }

    async setEmailConfirmed(client: authDB.TransactionClient, user: authDB.User.Raw, confirmed: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { emailConfirmed: confirmed }
        });
    }
}