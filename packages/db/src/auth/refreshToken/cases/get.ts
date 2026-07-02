import { AuthDBType } from '../../auth.js';

export default class GetRefreshToken {
	orThrow = {
		async byHashedToken(client: AuthDBType.TransactionClient, hashedToken: string) {
			return await client.refreshToken.findUniqueOrThrow({
				where: { hashedToken },
				include: {
					user: {
						include: {
							oauthAccounts: true,
						},
					},
				},
			});
		},
	};

	orNull = {
		async byHashedToken(client: AuthDBType.TransactionClient, hashedToken: string) {
			return await client.refreshToken.findUnique({
				where: { hashedToken },
				include: {
					user: {
						include: {
							oauthAccounts: true,
						},
					},
				},
			});
		},
	};
}
