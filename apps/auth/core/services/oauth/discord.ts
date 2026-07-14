import BaseService from '#core/base/service.js';
import type { AuthDBType, PublicUser } from '@packages/db';
import type { DiscordUsersMeReply } from '@packages/infra';
import { Oauth } from '@zed31rus/types';

export default class DiscordOauthService extends BaseService {
	async callback(code: string, publicUser: PublicUser | null) {
		this.logger.info(`Discord OAuth callback started, hasPublicUser=${!!publicUser}`);

		const exchangeReply = await this.infra.discord.oauth.exchangeCode(code);
		this.logger.info('Discord OAuth code exchanged successfully');

		const meRes = await this.infra.discord.users.me(exchangeReply.access_token);
		this.logger.info(
			`Fetched Discord user info: discordUserId=${meRes.id}, username=${meRes.username}`
		);

		const { user, isNew } = await this.resolveUser(publicUser, meRes);
		this.logger.info(
			`${isNew ? 'New user created' : 'Existing user resolved'} via Discord OAuth: userId=${user.id}, discordUserId=${meRes.id}`
		);

		const newPersonalUser = this.db.users.toPersonalJSON(user);
		const newPublicUser = this.db.users.toPublicJSON(user);

		await this.db.oauthAccount.upsert.upsert(
			this.db.client,
			{ provider: Oauth.Providers.discord, providerUserId: meRes.id },
			user,
			{
				accessToken: exchangeReply.access_token,
				refreshToken: exchangeReply.refresh_token,
				expiresAt: new Date(Date.now() + exchangeReply.expires_in * 1000),
				scope: exchangeReply.scope,
				rawProfile: meRes as unknown as AuthDBType.JsonObject,
			}
		);
		this.logger.info(
			`OAuth account upserted: userId=${user.id}, provider=${Oauth.Providers.discord}`
		);

		const session = await this.manager.session.createSession(user, this.db.client);
		this.logger.info(`Session created: userId=${user.id}`);

		if (isNew) {
			this.logger.info(
				`Sending oauthRegisteredNewUser to RabbitMQ: uuid=${newPublicUser.uuid}`
			);
			this.infra.rabbitmq.send('oauthRegisteredNewUser', newPublicUser.uuid);

			this.libs.mail.sendMail(
				newPersonalUser.email,
				'Добро пожаловать на zed31rus.ru!',
				`<p>Привет, ${newPersonalUser.nickname}! Спасибо за регистрацию на zed31rus.ru 🎉</p>`,
				`Привет, ${newPersonalUser.nickname}! Спасибо за регистрацию на zed31rus.ru`
			);
			this.logger.info(`Welcome email sent: userId=${user.id}`);
		}

		this.logger.info(`Discord OAuth callback completed: userId=${user.id}`);
		return { user: newPersonalUser, ...session };
	}

	private async resolveUser(publicUser: PublicUser | null, meRes: DiscordUsersMeReply) {
		this.logger.info(
			`Resolving user: hasPublicUser=${!!publicUser}, discordUserId=${meRes.id}`
		);

		if (publicUser) {
			this.logger.info(
				`Public user provided, fetching from DB: publicUserId=${publicUser.uuid}`
			);
			const user = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
			this.logger.info(`User resolved by public user: userId=${user.id}`);
			return { user, isNew: false };
		}

		const existingOauth = await this.db.oauthAccount.get.orNull.byProvider_providerUserId(
			this.db.client,
			Oauth.Providers.discord,
			meRes.id
		);
		if (existingOauth) {
			this.logger.info(
				`User resolved by existing OAuth account: userId=${existingOauth.user.id}, discordUserId=${meRes.id}`
			);
			return { user: existingOauth.user, isNew: false };
		}

		const userByEmail = await this.db.users.get.orNull.byEmail(this.db.client, meRes.email);
		if (userByEmail) {
			this.logger.warn(
				`User resolved by email, Discord was not linked before: userId=${userByEmail.id}`
			);
			return { user: userByEmail, isNew: false };
		}

		this.logger.info(`No existing user found, creating new: username=${meRes.username}`);
		const newUser = await this.db.users.create.create(
			this.db.client,
			meRes.global_name,
			meRes.username,
			meRes.email,
			null,
			true
		);
		this.logger.info(`New user created: userId=${newUser.id}`);

		return { user: newUser, isNew: true };
	}
}
