import authDB from "../../auth.db.js";

export default class GetVerificationCode {
    orThrow = {
        async get(client: authDB.TransactionClient, user: authDB.User.Raw, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: {userUuid: user.uuid, type: type}},
                include: { user: true }
            });
        }
    }
    orNull = {
        async get(client: authDB.TransactionClient, user: authDB.User.Raw, type: string) {
            return await client.verificationCode.findUniqueOrThrow({
                where: { userUuid_type: {userUuid: user.uuid, type: type}},
                include: { user: true }
            });
        }
    }
}