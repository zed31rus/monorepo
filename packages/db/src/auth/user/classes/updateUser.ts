import { authDBType, type RawUser } from '../../auth.db.js';

export default class UpdateUsers {
    async setAllowLoginFind(client: authDBType.TransactionClient, user: RawUser, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowLoginFind: allow },
        });
    }

    async setAllowEmailFind(client: authDBType.TransactionClient, user: RawUser, allow: boolean) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { allowEmailFind: allow },
        });
    }

    async setNickname(
        client: authDBType.TransactionClient,
        user: RawUser,
        nickname: string | null
    ) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { nickname },
        });
    }

    async setAvatar(client: authDBType.TransactionClient, user: RawUser, avatar: string | null) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { avatar },
        });
    }

    async setPasswordHash(
        client: authDBType.TransactionClient,
        user: RawUser,
        passwordHash: string
    ) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { passwordHash },
        });
    }

    async setEmailConfirmed(
        client: authDBType.TransactionClient,
        user: RawUser,
        confirmed: boolean
    ) {
        return await client.user.update({
            where: { uuid: user.uuid },
            data: { emailConfirmed: confirmed },
        });
    }
}
