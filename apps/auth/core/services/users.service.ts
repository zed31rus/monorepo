import BaseService from '#core/base/service.base.js';
import { type InternalUser, type PersonalUser, type PublicUser } from '@packages/db';

export default class UsersService extends BaseService {
	async getByUuid(
		uuid: PublicUser['uuid'],
		internal: boolean
	): Promise<{ user: PublicUser | InternalUser }> {
		const rawUser = await this.db.users.get.orThrow.byUuid(this.db.client, uuid);
		if (internal) {
			const internalUser = this.db.users.toInternalJSON(rawUser);
			return { user: internalUser };
		} else {
			const publicUser = this.db.users.toPublicJSON(rawUser);
			return { user: publicUser };
		}
	}

	async getByEmail(email: PersonalUser['email']): Promise<{ user: PublicUser }> {
		const rawUser = await this.db.users.get.orThrow.byEmail(this.db.client, email);
		if (!rawUser.allowEmailFind) {
			throw this.errors.api.NotFound();
		}
		const publicUser = this.db.users.toPublicJSON(rawUser);
		return { user: publicUser };
	}

	async getByLogin(login: PersonalUser['login']): Promise<{ user: PublicUser }> {
		const rawUser = await this.db.users.get.orThrow.byLogin(this.db.client, login);
		if (!rawUser.allowLoginFind) {
			throw this.errors.api.NotFound();
		}
		const publicUser = this.db.users.toPublicJSON(rawUser);

		return { user: publicUser };
	}

	async getByNickname(nickname: PublicUser['nickname']): Promise<{ user: PublicUser }> {
		const rawUser = await this.db.users.get.orThrow.byNick(this.db.client, nickname);
		const publicUser = this.db.users.toPublicJSON(rawUser);
		return { user: publicUser };
	}
}
