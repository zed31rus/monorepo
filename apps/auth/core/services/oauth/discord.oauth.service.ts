import BaseService from '#core/base/service.base.js';
import type { AuthDBType, PublicUser } from '@packages/db';
import type { DiscordUsersMeReply } from '@packages/infra';
import { OauthProviders } from '@zed31rus/types';

export default class DiscordOauthService extends BaseService {
	async callback(code: string, publicUser: PublicUser | null) {
		const exchangeReply = await this.infra.discord.oauth.exchangeCode(code);
		const meRes = await this.infra.discord.users.me(exchangeReply.access_token);

		const newRawUser = await this.resolveUser(publicUser, meRes);

		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);
		const newPublicUser = this.db.users.toPublicJSON(newRawUser);

		await this.db.oauthAccount.upsert.upsert(
			this.db.client,
			{ provider: OauthProviders.discord, providerUserId: meRes.id },
			newRawUser,
			{
				accessToken: exchangeReply.access_token,
				refreshToken: exchangeReply.refresh_token,
				expiresAt: new Date(Date.now() + exchangeReply.expires_in * 1000),
				scope: exchangeReply.scope,
				rawProfile: meRes as unknown as AuthDBType.JsonObject,
			}
		);

		const session = await this.manager.session.createSession(newRawUser, this.db.client);

		this.infra.rabbitmq.sendOauthRegistered(newPublicUser.uuid);

		return { user: newPersonalUser, ...session };
	}

	private async resolveUser(publicUser: PublicUser | null, meRes: DiscordUsersMeReply) {
		if (publicUser) {
			return await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		}

		const existingOauth = await this.db.oauthAccount.get.orNull.byProvider_providerUserId(
			this.db.client,
			OauthProviders.discord,
			meRes.id
		);
		if (existingOauth) return existingOauth.user;

		const userByEmail = await this.db.users.get.orNull.byEmail(this.db.client, meRes.email);
		if (userByEmail) return userByEmail;

		return await this.db.users.create.createUser(
			this.db.client,
			meRes.global_name,
			meRes.username,
			meRes.email,
			null,
			true
		);
	}
}
