import BaseManager from '#core/base/manager.base.js';
import type { AuthDBType, RawUser } from '@packages/db';

export default class OtpManager extends BaseManager {
	async createOtp(tx: AuthDBType.TransactionClient, user: RawUser, type: string) {
		const rawUser = user;
		const rawOtp = await this.libs.verificationCode.generateVerificationCode(6);
		const hashedOtp = await this.libs.hash.bcrypt.create(rawOtp, 10);
		const otpExpires = this.libs.verificationCode.getExpires();

		await this.db.verificationCode.upsert.upsert(
			tx,
			rawUser,
			hashedOtp,
			type,
			otpExpires.atTime
		);

		return { rawOtp };
	}

	async confirmOtp(
		tx: AuthDBType.TransactionClient,
		user: RawUser,
		submitCode: string,
		type: string
	) {
		const rawUser = user;
		const verificationRecord = await this.db.verificationCode.get.orThrow.get(
			tx,
			rawUser,
			type
		);
		const expired = this.libs.verificationCode.checkExpired(verificationRecord);
		if (expired) throw this.errors.api.Expired();
		const isCodeValid = await this.libs.hash.bcrypt.compare(
			submitCode,
			verificationRecord.hashedCode
		);
		if (!isCodeValid) throw this.errors.api.BadRequest('Invalid or expired verification code');

		await this.db.verificationCode.delete.delete(tx, verificationRecord);

		return { success: true };
	}
}
