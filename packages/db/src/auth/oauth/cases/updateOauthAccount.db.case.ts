import { AuthDBType } from '../../auth.db.js';

export default class updateOauthAccount {
	async update(
		client: AuthDBType.TransactionClient,
		account: AuthDBType.OauthAccountModel,
		data: AuthDBType.OauthAccountUpdateInput
	) {
		return await client.oauthAccount.update({
			where: {
				provider_providerUserId: {
					provider: account.provider,
					providerUserId: account.providerUserId,
				},
			},
			data,
		});
	}
}
