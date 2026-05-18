import { authDBType, type RawUser } from '../../auth.db.js';

export default class GetOauthAccount {
    orThrow = {
        async byProvider_providerUserId(
            client: authDBType.TransactionClient,
            provider: authDBType.OauthAccountModel['provider'],
            providerUserId: authDBType.OauthAccountModel['providerUserId']
        ) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: {
                    provider_providerUserId: { provider: provider, providerUserId: providerUserId },
                },
                include: { user: true },
            });
        },

        async byUserUuid_provider(
            client: authDBType.TransactionClient,
            user: RawUser,
            provider: authDBType.OauthAccountModel['provider']
        ) {
            return await client.oauthAccount.findUniqueOrThrow({
                where: { userUuid_provider: { provider: provider, userUuid: user.uuid } },
                include: { user: true },
            });
        },
    };

    orNull = {
        async byProvider_providerUserId(
            client: authDBType.TransactionClient,
            provider: authDBType.OauthAccountModel['provider'],
            providerUserId: authDBType.OauthAccountModel['providerUserId']
        ) {
            return await client.oauthAccount.findUnique({
                where: {
                    provider_providerUserId: { provider: provider, providerUserId: providerUserId },
                },
                include: { user: true },
            });
        },

        async byUserUuid_provider(
            client: authDBType.TransactionClient,
            user: RawUser,
            provider: authDBType.OauthAccountModel['provider']
        ) {
            return await client.oauthAccount.findUnique({
                where: { userUuid_provider: { provider: provider, userUuid: user.uuid } },
                include: { user: true },
            });
        },
    };
}
