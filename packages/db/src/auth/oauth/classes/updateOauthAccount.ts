import authDB from "../../auth.db.js";

export default class updateOauthAccount {
    async update(client: authDB.TransactionClient, account: authDB.OauthAccount, data: authDB.OauthAccountUpdateInput) {
        return await client.oauthAccount.update({
            where: { provider_providerUserId: {provider: account.provider, providerUserId: account.providerUserId} },
            data
        });
    }
}