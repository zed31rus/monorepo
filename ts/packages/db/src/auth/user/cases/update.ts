import { AuthDBType, type RawUser } from '../../auth.js';

export default class UpdateUsers {
	async setAllowLoginFind(client: AuthDBType.TransactionClient, user: RawUser, allow: boolean) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { allowLoginFind: allow },
			include: {
				oauthAccounts: true,
			},
		});
	}

	async setAllowEmailFind(client: AuthDBType.TransactionClient, user: RawUser, allow: boolean) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { allowEmailFind: allow },
			include: {
				oauthAccounts: true,
			},
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
			include: {
				oauthAccounts: true,
			},
		});
	}

	async setAvatar(client: AuthDBType.TransactionClient, user: RawUser, avatar: string | null) {
		return await client.user.update({
			where: { uuid: user.uuid },
			data: { avatar },
			include: {
				oauthAccounts: true,
			},
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
			include: {
				oauthAccounts: true,
			},
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
			include: {
				oauthAccounts: true,
			},
		});
	}
}
