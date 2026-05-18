import { authDBType } from '../../auth.db.js';

export default class DeleteRefreshToken {
    async delete(client: authDBType.TransactionClient, refreshToken: authDBType.RefreshTokenModel) {
        await client.refreshToken.delete({
            where: {
                hashedToken: refreshToken.hashedToken,
            },
        });
    }
}
