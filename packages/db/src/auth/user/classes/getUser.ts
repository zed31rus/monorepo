import type { OauthProviders } from '@zed31rus/types';
import type { AuthDBType, PublicUser, RawUser } from '../../auth.db.js';

export default class GetUser {
	orThrow = {
		async byPublicUser(client: AuthDBType.TransactionClient, publicUser: PublicUser) {
			return await client.user.findUniqueOrThrow({
				where: { uuid: publicUser.uuid },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byUuid(client: AuthDBType.TransactionClient, uuid: RawUser['uuid']) {
			return await client.user.findUniqueOrThrow({
				where: { uuid },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byLogin(client: AuthDBType.TransactionClient, login: RawUser['login']) {
			return await client.user.findUniqueOrThrow({
				where: { login },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byEmail(client: AuthDBType.TransactionClient, email: RawUser['email']) {
			return await client.user.findUniqueOrThrow({
				where: { email },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byNick(client: AuthDBType.TransactionClient, nickname: RawUser['nickname']) {
			return await client.user.findFirstOrThrow({
				where: { nickname },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async withProvider(
			client: AuthDBType.TransactionClient,
			uuid: RawUser['uuid'],
			provider: OauthProviders
		) {
			return await client.user.findUniqueOrThrow({
				where: {
					uuid,
					oauthAccounts: {
						some: {
							provider: provider,
						},
					},
				},
				include: {
					oauthAccounts: {
						where: {
							provider: provider,
						},
					},
				},
			});
		},
	};

	orNull = {
		async byPublicUser(client: AuthDBType.TransactionClient, publicUser: PublicUser) {
			return await client.user.findUnique({
				where: { uuid: publicUser.uuid },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byUuid(client: AuthDBType.TransactionClient, uuid: RawUser['uuid']) {
			return await client.user.findUnique({
				where: { uuid },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byLogin(client: AuthDBType.TransactionClient, login: RawUser['login']) {
			return await client.user.findUnique({
				where: { login },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byEmail(client: AuthDBType.TransactionClient, email: RawUser['email']) {
			return await client.user.findUnique({
				where: { email },
				include: {
					oauthAccounts: true,
				},
			});
		},
		async byNick(client: AuthDBType.TransactionClient, nickname: RawUser['nickname']) {
			return await client.user.findFirst({
				where: { nickname },
				include: {
					oauthAccounts: true,
				},
			});
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
