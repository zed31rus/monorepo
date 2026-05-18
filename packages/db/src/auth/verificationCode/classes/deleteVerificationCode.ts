import { type authDBType } from '../../auth.db.js';

export default class DeleteVerificationCode {
    async delete(client: authDBType.TransactionClient, code: authDBType.VerificationCodeModel) {
        return await client.verificationCode.delete({
            where: { userUuid_type: { userUuid: code.userUuid, type: code.type } },
        });
    }
}
