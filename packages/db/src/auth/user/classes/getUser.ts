import type { AuthDBType, PublicUser, RawUser } from '../../auth.db.js';

export default class GetUser {
	orThrow = {
		async byPublicUser(client: AuthDBType.TransactionClient, publicUser: PublicUser) {
			return await client.user.findUniqueOrThrow({ where: { uuid: publicUser.uuid } });
		},
		async byUuid(client: AuthDBType.TransactionClient, uuid: RawUser['uuid']) {
			return await client.user.findUniqueOrThrow({ where: { uuid } });
		},
		async byLogin(client: AuthDBType.TransactionClient, login: RawUser['login']) {
			return await client.user.findUniqueOrThrow({ where: { login } });
		},
		async byEmail(client: AuthDBType.TransactionClient, email: RawUser['email']) {
			return await client.user.findUniqueOrThrow({ where: { email } });
		},
		async byNick(client: AuthDBType.TransactionClient, nickname: RawUser['nickname']) {
			return await client.user.findFirstOrThrow({ where: { nickname } });
		},
	};

	orNull = {
		async byPublicUser(client: AuthDBType.TransactionClient, publicUser: PublicUser) {
			return await client.user.findUnique({ where: { uuid: publicUser.uuid } });
		},
		async byUuid(client: AuthDBType.TransactionClient, uuid: RawUser['uuid']) {
			return await client.user.findUnique({ where: { uuid } });
		},
		async byLogin(client: AuthDBType.TransactionClient, login: RawUser['login']) {
			return await client.user.findUnique({ where: { login } });
		},
		async byEmail(client: AuthDBType.TransactionClient, email: RawUser['email']) {
			return await client.user.findUnique({ where: { email } });
		},
		async byNick(client: AuthDBType.TransactionClient, nickname: RawUser['nickname']) {
			return await client.user.findFirst({ where: { nickname } });
		},
	};

	many = {
		async all(client: AuthDBType.TransactionClient) {
			return await client.user.findMany();
		},
		async page(client: AuthDBType.TransactionClient, page: number, limit: number) {
			return await client.user.findMany({
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: 'desc' },
			});
		},
	};
}
