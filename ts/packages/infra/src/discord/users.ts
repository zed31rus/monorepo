import { ApiErrors } from '@shared/errors';
import BaseInfra from '../base.js';

export default class UsersDiscordInfra extends BaseInfra {
	API_ENDPOINT = 'https://discord.com/api/v10';

	async me(accessToken: string) {
		const response = await fetch(`${this.API_ENDPOINT}/users/@me`, {
			method: 'GET',

			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw this.errors.api.badRequest(ApiErrors.BadRequestMessage.DISCORD_API_ERROR);
		}

		return (await response.json()) as DiscordUsersMeReply;
	}
}

export interface DiscordUsersMeReply {
	id: string;
	username: string;
	avatar: string;
	discriminator: string;
	public_flags: number;
	flags: number;
	banner: null;
	accent_color: number;
	global_name: string;
	avatar_decoration_data: null;
	collectibles: null;
	display_name_styles: null;
	banner_color: string;
	clan: object;
	primary_guild: object;
	mfa_enabled: true;
	locale: string;
	premium_type: number;
	email: string;
	verified: true;
}
