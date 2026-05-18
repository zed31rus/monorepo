import { authDBType } from '../../auth.db.js';

export default class updateOauthAccount {
    async update(
        client: authDBType.TransactionClient,
        account: authDBType.OauthAccountModel,
        data: authDBType.OauthAccountUpdateInput
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
