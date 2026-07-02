import { ApiErrors } from '@shared/errors';
import BaseInfra from '../infra.base.js';

export default class OauthSpotifyInfra extends BaseInfra {
	API_ENDPOINT = 'https://accounts.spotify.com/api';
	CLIENT_ID = this.config.env.SPOTIFY_CLIENT_ID;
	CLIENT_SECRET = this.config.env.SPOTIFY_CLIENT_SECRET;

	async refreshToken(refreshToken: string) {
		const response = await fetch(`${this.API_ENDPOINT}/token`, {
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
			throw this.errors.api.badRequest(ApiErrors.BadRequestMessage.SPOTIFY_API_ERROR);
		}

		return (await response.json()) as SpotifyOauthTokenReply;
	}
}

export interface SpotifyOauthExchangeReply {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}

export interface SpotifyOauthTokenReply {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
}
