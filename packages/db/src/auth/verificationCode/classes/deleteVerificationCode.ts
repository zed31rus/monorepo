import authDB from "../../auth.db.js";

export default class DeleteVerificationCode {
    async delete(client: authDB.TransactionClient, code: authDB.VerificationCode) {
        return await client.verificationCode.delete({
            where: {userUuid_type: {userUuid: code.userUuid, type: code.type}}
        })
    }
}