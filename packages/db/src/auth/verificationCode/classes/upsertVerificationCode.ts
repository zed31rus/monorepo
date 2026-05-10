import authDB from "../../auth.db.js";

export default class UpsertVerificationCode {
    async upsert(client: authDB.TransactionClient, user: authDB.User.Raw, hashedCode: string, type: string, expiresAt: Date) {
        return await client.verificationCode.upsert({
            where: { userUuid_type: { userUuid: user.uuid, type: type } },
            update: { hashedCode: hashedCode, expiresAt: expiresAt, createdAt: new Date() },
            create: { userUuid: user.uuid, hashedCode: hashedCode, type: type, expiresAt: expiresAt }
        });
    }
}