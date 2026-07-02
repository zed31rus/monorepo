import { AuthDBType } from '../../auth.js';

export default class DeleteRefreshToken {
	async delete(client: AuthDBType.TransactionClient, refreshToken: AuthDBType.RefreshTokenModel) {
		await client.refreshToken.delete({
			where: {
				hashedToken: refreshToken.hashedToken,
			},
		});
	}
}
