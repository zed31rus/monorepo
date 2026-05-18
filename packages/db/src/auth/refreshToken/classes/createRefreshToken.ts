import { authDBType } from '../../auth.db.js';

export default class CreateRefreshToken {
    async create(
        client: authDBType.TransactionClient,
        hashedToken: string,
        expiresAt: Date,
        user: authDBType.UserModel
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
