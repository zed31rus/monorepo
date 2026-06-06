import { AuthDBType, type RawUser } from '../../auth.db.js';

export default class CreateUsers {
	async createUser(
		client: AuthDBType.TransactionClient,
		nickname: RawUser['nickname'],
		login: RawUser['login'],
		email: RawUser['email'],
		passwordHash: RawUser['passwordHash'],
		emailConfirmed: RawUser['emailConfirmed']
	) {
		return await client.user.create({
			data: {
				login,
				email,
				nickname,
				passwordHash,
				emailConfirmed,
			},
			include: {
				oauthAccounts: true,
			},
		});
	}
}
