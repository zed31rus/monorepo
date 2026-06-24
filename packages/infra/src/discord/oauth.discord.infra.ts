import { ApiErrors } from '@shared/errors';
import BaseInfra from '../infra.base.js';

export default class OauthDiscordInfra extends BaseInfra {
	API_ENDPOINT = 'https://discord.com/api/v10';
	CLIENT_ID = this.config.env.DISCORD_OAUTH_CLIENT_ID;
	CLIENT_SECRET = this.config.env.DISCORD_OAUTH_CLIENT_SECRET;
	REDIRECT_URI = this.config.env.DISCORD_OAUTH_REDIRECT_URL;

	async exchangeCode(code: string) {
		const response = await fetch(`${this.API_ENDPOINT}/oauth2/token`, {
			method: 'POST',

			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64')}`,
			},

			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code: code,
				redirect_uri: this.REDIRECT_URI,
			}),
		});

		if (!response.ok) {
			throw this.errors.api.badRequest(ApiErrors.BadRequestMessage.DISCORD_API_ERROR);
		}

		return (await response.json()) as DiscordOauthExchangeReply;
	}

	async token(refreshToken: string) {
		const response = await fetch(`${this.API_ENDPOINT}/oauth2/token`, {
			method: 'POST',

			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64')}`,
			},

			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: refreshToken,
			}),
		});

		if (!response.ok) {
			throw this.errors.api.badRequest(ApiErrors.BadRequestMessage.DISCORD_API_ERROR);
		}

		return (await response.json()) as DiscordOauthTokenReply;
	}
}

export interface DiscordOauthExchangeReply {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}

export interface DiscordOauthTokenReply {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}
