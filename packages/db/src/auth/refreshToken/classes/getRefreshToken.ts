import { authDBType } from '../../auth.db.js';

export default class GetRefreshToken {
    orThrow = {
        async byHashedToken(client: authDBType.TransactionClient, hashedToken: string) {
            return await client.refreshToken.findUniqueOrThrow({
                where: { hashedToken },
                include: { user: true },
            });
        },
    };

    orNull = {
        async byHashedToken(client: authDBType.TransactionClient, hashedToken: string) {
            return await client.refreshToken.findUnique({
                where: { hashedToken },
                include: { user: true },
            });
        },
    };
}
