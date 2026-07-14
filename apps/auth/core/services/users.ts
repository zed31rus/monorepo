import BaseService from '#core/base/service.js';
import { type InternalUser, type PersonalUser, type PublicUser } from '@packages/db';
import { ApiErrors } from '@shared/errors';
import { Oauth } from '@zed31rus/types';

export default class UsersService extends BaseService {
	async getInternalByUuid(uuid: string, provider: Oauth.Providers): Promise<InternalUser> {
		const rawUser = await this.db.users.get.orThrow.withProvider(
			this.db.client,
			uuid,
			provider
		);
		const internalUser = await this.db.users.toInternalJSON(rawUser);
		return internalUser;
	}

	async getByUuid(uuid: string): Promise<{ user: PublicUser | InternalUser }> {
		const rawUser = await this.db.users.get.orThrow.byUuid(this.db.client, uuid);
		const publicUser = this.db.users.toPublicJSON(rawUser);
		return { user: publicUser };
	}

	async getByEmail(email: PersonalUser['email']): Promise<{ user: PublicUser }> {
		const rawUser = await this.db.users.get.orThrow.byEmail(this.db.client, email);
		if (!rawUser.allowEmailFind) {
			throw this.errors.api.notFound(ApiErrors.NotFoundMessage.USER_NOT_FOUND);
		}
		const publicUser = this.db.users.toPublicJSON(rawUser);
		return { user: publicUser };
	}

	async getByLogin(login: PersonalUser['login']): Promise<{ user: PublicUser }> {
		const rawUser = await this.db.users.get.orThrow.byLogin(this.db.client, login);
		if (!rawUser.allowLoginFind) {
			throw this.errors.api.notFound(ApiErrors.NotFoundMessage.USER_NOT_FOUND);
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
