import { AuthDBType, type RawUser } from '../../auth.db.js';

export default class UpdateUsers {
	async setAllowLoginFind(client: AuthDBType.TransactionClient, user: RawUser, allow: boolean) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { allowLoginFind: allow },
		});
	}

	async setAllowEmailFind(client: AuthDBType.TransactionClient, user: RawUser, allow: boolean) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { allowEmailFind: allow },
		});
	}

	async setNickname(
		client: AuthDBType.TransactionClient,
		user: RawUser,
		nickname: string | null
	) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { nickname },
		});
	}

	async setAvatar(client: AuthDBType.TransactionClient, user: RawUser, avatar: string | null) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { avatar },
		});
	}

	async setPasswordHash(
		client: AuthDBType.TransactionClient,
		user: RawUser,
		passwordHash: string
	) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { passwordHash },
		});
	}

	async setEmailConfirmed(
		client: AuthDBType.TransactionClient,
		user: RawUser,
		confirmed: boolean
	) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { emailConfirmed: confirmed },
		});
	}
}
