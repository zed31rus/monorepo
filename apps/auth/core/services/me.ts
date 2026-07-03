import BaseService from '#core/base/service.js';
import { type PersonalUser, type PublicUser } from '@packages/db';

export default class MeService extends BaseService {
	async get(publicUser: PublicUser): Promise<{ user: PersonalUser }> {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const personalUser = this.db.users.toPersonalJSON(rawUser);
		return { user: personalUser };
	}
}
