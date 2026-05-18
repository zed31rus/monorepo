import { authDBType, type RawUser } from '../../auth.db.js';

export default class GetVerificationCode {
    orThrow = {
        async get(client: authDBType.TransactionClient, user: RawUser, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: { userUuid: user.uuid, type: type } },
                include: { user: true },
            });
        },
    };
    orNull = {
        async get(client: authDBType.TransactionClient, user: RawUser, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: { userUuid: user.uuid, type: type } },
                include: { user: true },
            });
        },
    };
}
