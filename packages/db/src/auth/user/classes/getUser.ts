import type { authDBType, PublicUser, RawUser } from '../../auth.db.js';

export default class GetUser {
    orThrow = {
        async byPublicUser(client: authDBType.TransactionClient, publicUser: PublicUser) {
            return await client.user.findUniqueOrThrow({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: authDBType.TransactionClient, uuid: RawUser['uuid']) {
            return await client.user.findUniqueOrThrow({ where: { uuid } });
        },
        async byLogin(client: authDBType.TransactionClient, login: RawUser['login']) {
            return await client.user.findUniqueOrThrow({ where: { login } });
        },
        async byEmail(client: authDBType.TransactionClient, email: RawUser['email']) {
            return await client.user.findUniqueOrThrow({ where: { email } });
        },
        async byNick(client: authDBType.TransactionClient, nickname: RawUser['nickname']) {
            return await client.user.findFirstOrThrow({ where: { nickname } });
        },
    };

    orNull = {
        async byPublicUser(client: authDBType.TransactionClient, publicUser: PublicUser) {
            return await client.user.findUnique({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: authDBType.TransactionClient, uuid: RawUser['uuid']) {
            return await client.user.findUnique({ where: { uuid } });
        },
        async byLogin(client: authDBType.TransactionClient, login: RawUser['login']) {
            return await client.user.findUnique({ where: { login } });
        },
        async byEmail(client: authDBType.TransactionClient, email: RawUser['email']) {
            return await client.user.findUnique({ where: { email } });
        },
        async byNick(client: authDBType.TransactionClient, nickname: RawUser['nickname']) {
            return await client.user.findFirst({ where: { nickname } });
        },
    };

    many = {
        async all(client: authDBType.TransactionClient) {
            return await client.user.findMany();
        },
        async page(client: authDBType.TransactionClient, page: number, limit: number) {
            return await client.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            });
        },
    };
}
