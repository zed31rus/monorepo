import authDB from "../../auth.db.js";

export default class CreateRefreshToken {
    async create(client: authDB.TransactionClient, hashedToken: string, expiresAt: Date, user: authDB.UserModel) {
        await client.refreshToken.create({
            data: {
                hashedToken: hashedToken,
                expiresAt: expiresAt,
                user: {connect: {uuid: user.uuid}}
            }
        })
    }
}