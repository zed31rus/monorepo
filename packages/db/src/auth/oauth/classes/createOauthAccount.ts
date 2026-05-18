import Types from '@zed31rus/types';
import { authDBType, type RawUser } from '../../auth.db.js';

export default class CreateOauthAccount {
    async create(
        client: authDBType.TransactionClient,
        user: RawUser,
        account: {
            provider: Types.Oauth.Providers;
            providerUserId: authDBType.OauthAccountModel['providerUserId'];
        },
        payload: Omit<authDBType.OauthAccountCreateWithoutUserInput, 'provider' | 'providerUserId'>
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
