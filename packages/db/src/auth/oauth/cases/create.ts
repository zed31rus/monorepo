import { Oauth } from '@zed31rus/types';
import { AuthDBType, type RawUser } from '../../auth.js';

export default class CreateOauthAccount {
	async create(
		client: AuthDBType.TransactionClient,
		user: RawUser,
		account: {
			provider: Oauth.Providers;
			providerUserId: AuthDBType.OauthAccountModel['providerUserId'];
		},
		payload: Omit<AuthDBType.OauthAccountCreateWithoutUserInput, 'provider' | 'providerUserId'>
	) {
		return await client.oauthAccount.create({
			data: {
				...account,
				...payload,
				user: { connect: { uuid: user.uuid } },
			},
		});
	}
}
