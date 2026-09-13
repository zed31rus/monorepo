import { type AuthDBType } from '../../auth.js';

export default class DeleteVerificationCode {
	async delete(client: AuthDBType.TransactionClient, code: AuthDBType.VerificationCodeModel) {
		return await client.verificationCode.delete({
			where: { userUuid_type: { userUuid: code.userUuid, type: code.type } },
		});
	}
}
