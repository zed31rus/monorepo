import type { Oauth } from '@zed31rus/types';
import BaseInfra from '../../base.js';
import { type InternalUser } from '@packages/db';

export default class UsersAuthInternalInfra extends BaseInfra {
	async getByUUID(uuid: string, provider: Oauth.Providers): Promise<{ user: InternalUser }> {
		const res = await fetch(`http://localhost:3201/users/uuid/${uuid}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Internal-Token': this.config.env.INTERNAL_TOKEN,
			},
			body: JSON.stringify({
				provider: provider,
			}),
		});

		const data = (await res.json()) as { user: InternalUser };

		return data;
	}
}
