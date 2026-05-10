import authDB from "../../auth.db.js";

export default class DeleteRefreshToken {
    async delete(client: authDB.TransactionClient, refreshToken: authDB.RefreshTokenModel) {
        await client.refreshToken.delete({
            where: {
                hashedToken: refreshToken.hashedToken
            }
        })
    }
}