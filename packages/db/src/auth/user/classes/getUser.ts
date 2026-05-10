import authDB from "../../auth.db.js";

export default class GetUser {
    orThrow = {
        async byPublicUser(client: authDB.TransactionClient, publicUser: authDB.User.Public) {
            return await client.user.findUniqueOrThrow({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: authDB.TransactionClient, uuid: authDB.User.Raw['uuid']) {
            return await client.user.findUniqueOrThrow({ where: { uuid } });
        },
        async byLogin(client: authDB.TransactionClient, login: authDB.User.Raw['login']) {
            return await client.user.findUniqueOrThrow({ where: { login } });
        },
        async byEmail(client: authDB.TransactionClient, email: authDB.User.Raw['email']) { 
            return await client.user.findUniqueOrThrow({ where: { email } });
        },
        async byNick(client: authDB.TransactionClient, nickname: authDB.User.Raw['nickname']) { 
            return await client.user.findFirstOrThrow({ where: { nickname } });
        },
    }

    orNull = {
        async byPublicUser(client: authDB.TransactionClient, publicUser: authDB.User.Public) {
            return await client.user.findUnique({ where: { uuid: publicUser.uuid } });
        },
        async byUuid(client: authDB.TransactionClient, uuid: authDB.User.Raw['uuid']) {
            return await client.user.findUnique({ where: { uuid } });
        },
        async byLogin(client: authDB.TransactionClient, login: authDB.User.Raw['login']) {
            return await client.user.findUnique({ where: { login } });
        },
        async byEmail(client: authDB.TransactionClient, email: authDB.User.Raw['email']) { 
            return await client.user.findUnique({ where: { email } });
        },
        async byNick(client: authDB.TransactionClient, nickname: authDB.User.Raw['nickname']) { 
            return await client.user.findFirst({ where: { nickname } });
        },
    }

    many = {
        async all(client: authDB.TransactionClient, ) {
            return await client.user.findMany();
        },
        async page(client: authDB.TransactionClient, page: number, limit: number) {
            return await client.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            });
        }
    }
}