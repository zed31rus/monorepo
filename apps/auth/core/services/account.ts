import BaseService from '#core/base/service.js';
import type { PublicUser } from '@packages/db';
import { ApiErrors } from '@shared/errors';
import { OtpTypes } from '#core/types/account.js';

export default class AccountService extends BaseService {
	async emailVerificationSend(publicUser: PublicUser) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const personalUser = this.db.users.toPersonalJSON(rawUser);

		if (rawUser.emailConfirmed) return { user: personalUser };

		const rawOtp = await this.manager.otp.createOtp(
			this.db.client,
			rawUser,
			OtpTypes.emailConfirm
		);

		if (rawOtp)
			this.libs.mail.sendMail(
				rawUser.email,
				'Verification Code',
				`<p>Your verification code: ${rawOtp}</p>`,
				`Your verification code: ${rawOtp}`
			);

		return { user: personalUser };
	}

	async emailVerificationConfirm(publicUser: PublicUser, submitCode: string) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const personalUser = this.db.users.toPersonalJSON(rawUser);

		if (rawUser.emailConfirmed) return { user: personalUser };

		const { newRawUser } = await this.db.client.$transaction(async (tx) => {
			const { success } = await this.manager.otp.confirmOtp(
				tx,
				rawUser,
				submitCode,
				OtpTypes.emailConfirm
			);
			if (!success) throw this.errors.api.badRequest(ApiErrors.BadRequestMessage.INVALID_OTP);
			const newRawUser = await this.db.users.update.setEmailConfirmed(tx, rawUser, true);
			return { newRawUser };
		});

		this.libs.mail.sendMail(
			newRawUser.email,
			'Your email address is verified',
			'<p>Your email address is verified</p>',
			'Your email address is verified'
		);

		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);

		return { user: newPersonalUser };
	}

	async changePasswordRequest(publicUser: PublicUser) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const personalUser = this.db.users.toPersonalJSON(rawUser);

		const rawOtp = await this.manager.otp.createOtp(
			this.db.client,
			rawUser,
			OtpTypes.passwordChange
		);

		if (rawOtp)
			this.libs.mail.sendMail(
				rawUser.email,
				'Verification Code',
				`<p>Your verification code: ${rawOtp}</p>`,
				`Your verification code: ${rawOtp}`
			);

		return { user: personalUser };
	}

	async changePasswordConfirm(publicUser: PublicUser, password: string, submitCode: string) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, publicUser);
		const hashedPassword = await this.libs.hash.bcrypt.create(password, 10);

		const { newRawUser } = await this.db.client.$transaction(async (tx) => {
			const { success } = await this.manager.otp.confirmOtp(
				tx,
				rawUser,
				submitCode,
				OtpTypes.passwordChange
			);
			if (!success) throw this.errors.api.badRequest(ApiErrors.BadRequestMessage.INVALID_OTP);
			const newRawUser = await this.db.users.update.setPasswordHash(
				tx,
				rawUser,
				hashedPassword
			);
			return { newRawUser };
		});
		this.libs.mail.sendMail(
			newRawUser.email,
			'Password change.',
			'<p>Your password has been successfully changed.</p>',
			'Your password has been successfully changed.'
		);

		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);

		return { user: newPersonalUser };
	}
}
