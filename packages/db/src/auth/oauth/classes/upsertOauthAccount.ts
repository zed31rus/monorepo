import Types from "@zed31rus/types";
import authDB from "../../auth.db.js";

export default class UpsertOauthAccount {
    async upsert(
        client: authDB.TransactionClient,
        where: { provider: Types.Oauth.Providers, providerUserId: string },
        user: authDB.User.Raw,
        oauthData: {
            accessToken?: string | null;
            refreshToken?: string | null;
            expiresAt?: Date | null;
            scope?: string | null;
            rawProfile?: authDB.InputJsonValue;
        }

    ) {
        return await client.oauthAccount.upsert({
            where: { 
                provider_providerUserId: {
                    provider: where.provider, 
                    providerUserId: where.providerUserId
                } 
            },
            update: {
                accessToken: oauthData.accessToken,
                refreshToken: oauthData.refreshToken,
                expiresAt: oauthData.expiresAt,
                scope: oauthData.scope,
                rawProfile: oauthData.rawProfile,
            },
            create: {
                provider: where.provider,
                providerUserId: where.providerUserId,
                accessToken: oauthData.accessToken,
                refreshToken: oauthData.refreshToken,
                expiresAt: oauthData.expiresAt,
                scope: oauthData.scope,
                rawProfile: oauthData.rawProfile,
                userUuid: user.uuid
            }
        });
    }
}