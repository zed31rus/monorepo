import authDB from "../../auth.db.js";

export default class GetOauthAccount {
    orThrow = {
        async byProvider_providerUserId(client: authDB.TransactionClient, provider: authDB.OauthAccount['provider'], providerUserId: authDB.OauthAccount['providerUserId']) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: { provider_providerUserId: {provider: provider, providerUserId: providerUserId}},
                include: { user: true }
            });
        },

        async byUserUuid_provider(client: authDB.TransactionClient, user: authDB.User.Raw, provider: authDB.OauthAccount['provider']) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: { userUuid_provider: {provider: provider, userUuid: user.uuid} },
                include: { user: true }
            })
        }
    }

    orNull = {
        async byProvider_providerUserId(client: authDB.TransactionClient, provider: authDB.OauthAccount['provider'], providerUserId: authDB.OauthAccount['providerUserId']) {
            return await client.oauthAccount.findUnique({
                where: { provider_providerUserId: {provider: provider, providerUserId: providerUserId}},
                include: { user: true }
            });
        },

        async byUserUuid_provider(client: authDB.TransactionClient, user: authDB.User.Raw, provider: authDB.OauthAccount['provider']) {
            return await client.oauthAccount.findUnique({
                where: { userUuid_provider: {provider: provider, userUuid: user.uuid} },
                include: { user: true }
            })
        }
    }

}