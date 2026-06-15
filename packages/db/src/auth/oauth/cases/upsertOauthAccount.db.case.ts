import type { OauthProviders } from '@zed31rus/types';
import { AuthDBType, type RawUser } from '../../auth.db.js';

export default class UpsertOauthAccount {
	async upsert(
		client: AuthDBType.TransactionClient,
		where: { provider: OauthProviders; providerUserId: string },
		user: RawUser,
		oauthData: {
			accessToken?: string | null;
			refreshToken?: string | null;
			expiresAt?: Date | null;
			scope?: string | null;
			rawProfile?: AuthDBType.InputJsonValue;
		}
	) {
		return await client.oauthAccount.upsert({
			where: {
				provider_providerUserId: {
					provider: where.provider,
					providerUserId: where.providerUserId,
				},
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
				userUuid: user.uuid,
			},
		});
	}
}
