import { AuthDBType, type RawUser } from '../../auth.db.js';

export default class GetOauthAccount {
	orThrow = {
		async byProvider_providerUserId(
			client: AuthDBType.TransactionClient,
			provider: AuthDBType.OauthAccountModel['provider'],
			providerUserId: AuthDBType.OauthAccountModel['providerUserId']
		) {
			return await client.oauthAccount.findUniqueOrThrow({
				where: {
					provider_providerUserId: { provider: provider, providerUserId: providerUserId },
				},
				include: { user: true },
			});
		},

		async byUserUuid_provider(
			client: AuthDBType.TransactionClient,
			user: RawUser,
			provider: AuthDBType.OauthAccountModel['provider']
		) {
			return await client.oauthAccount.findUniqueOrThrow({
				where: { userUuid_provider: { provider: provider, userUuid: user.uuid } },
				include: { user: true },
			});
		},
	};

	orNull = {
		async byProvider_providerUserId(
			client: AuthDBType.TransactionClient,
			provider: AuthDBType.OauthAccountModel['provider'],
			providerUserId: AuthDBType.OauthAccountModel['providerUserId']
		) {
			return await client.oauthAccount.findUnique({
				where: {
					provider_providerUserId: { provider: provider, providerUserId: providerUserId },
				},
				include: {
					user: {
						include: {
							oauthAccounts: true,
						},
					},
				},
			});
		},

		async byUserUuid_provider(
			client: AuthDBType.TransactionClient,
			user: RawUser,
			provider: AuthDBType.OauthAccountModel['provider']
		) {
			return await client.oauthAccount.findUnique({
				where: { userUuid_provider: { provider: provider, userUuid: user.uuid } },
				include: { user: true },
			});
		},
	};
}
