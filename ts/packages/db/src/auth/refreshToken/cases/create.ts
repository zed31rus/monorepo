import { AuthDBType } from '../../auth.js';

export default class CreateRefreshToken {
	async create(
		client: AuthDBType.TransactionClient,
		hashedToken: string,
		expiresAt: Date,
		user: AuthDBType.UserModel
	) {
		await client.refreshToken.create({
			data: {
				hashedToken: hashedToken,
				expiresAt: expiresAt,
				user: { connect: { uuid: user.uuid } },
			},
		});
	}
}
