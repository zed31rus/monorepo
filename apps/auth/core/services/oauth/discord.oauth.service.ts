import BaseService from "#core/base/service.base.js";
import type SessionManager from "#root/core/managers/session.manager.js";
import DbContainer from "@packages/db";
import Types from "@zed31rus/types";

export default class DiscordOauthService extends BaseService {
    async callback(code: string, publicUser: DbContainer.authDB.User.Public | null): Promise<{ user: DbContainer.authDB.User.Personal } & Awaited<ReturnType<SessionManager['createSession']>>> {
        const exchangeReply = await this.infra.oauth.discord.exchangeCode(code);
        const meRes = await this.infra.oauth.discord.me(exchangeReply.access_token);

        const newRawUser = await this.resolveUser(publicUser, meRes);
        
        const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);
        const newPublicUser = this.db.users.toPublicJSON(newRawUser)

        await this.db.oauthAccount.upsert.upsert(
            this.db.client,
            { provider: Types.Oauth.Providers.discord, providerUserId: meRes.id },
            newRawUser,
            {
                accessToken: exchangeReply.access_token,
                refreshToken: exchangeReply.refresh_token,
                expiresAt: new Date(Date.now() + exchangeReply.expires_in * 1000),
                scope: exchangeReply.scope,
                rawProfile: meRes as unknown as DbContainer.authDB.JsonObject
            }
        );

        const session = await this.manager.session.createSession(newRawUser, this.db.client);

        this.infra.rabbitmq.sendOauthRegistered(newPublicUser.uuid);

        return { user: newPersonalUser, ...session }
    }

    private async resolveUser(publicUser: DbContainer.authDB.User.Public | null, meRes: Types.Oauth.Discord.ApiMeReply) {
        if (publicUser) {
            return await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
        }

        const existingOauth = await this.db.oauthAccount.get.orNull.byProvider_providerUserId(
            this.db.client, Types.Oauth.Providers.discord, meRes.id
        );
        if (existingOauth) return existingOauth.user;

        const userByEmail = await this.db.users.get.orNull.byEmail(this.db.client, meRes.email);
        if (userByEmail) return userByEmail;

        return await this.db.users.create.createUser(
            this.db.client, meRes.global_name, meRes.username, meRes.email, null, true
        );
    }
}