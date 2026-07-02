import { AuthDBType, type RawUser } from '../../auth.js';

export default class GetVerificationCode {
	orThrow = {
		async get(client: AuthDBType.TransactionClient, user: RawUser, type: string) {
			return await client.verificationCode.findUniqueOrThrow({
				where: { userUuid_type: { userUuid: user.uuid, type: type } },
				include: { user: true },
			});
		},
	};
	orNull = {
		async get(client: AuthDBType.TransactionClient, user: RawUser, type: string) {
			return await client.verificationCode.findUniqueOrThrow({
				where: { userUuid_type: { userUuid: user.uuid, type: type } },
				include: { user: true },
			});
		},
	};
}
