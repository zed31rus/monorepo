import BaseService from '#core/base/service.base.js';
import type { PersonalUser, PublicUser } from '@packages/db';
import { OtpTypes } from '@zed31rus/types';

export default class AccountService extends BaseService {
	async emailVerificationSend(user: PublicUser): Promise<{ user: PersonalUser }> {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user);
		const personalUser = this.db.users.toPersonalJSON(rawUser);

		if (rawUser.emailConfirmed) return { user: personalUser };

		const rawOtp = await this.manager.otp.createOtp(
			this.db.client,
			rawUser,
			OtpTypes.EmailConfirm
		);

		if (rawOtp)
			this.libs.mail.sendMail(
				rawUser.email,
				'Код подтверждения',
				`<p>Ваш код подтверждения: ${rawOtp}</p>`,
				`Ваш код подтверждения: ${rawOtp}`
			);

		return { user: personalUser };
	}

	async emailVerificationConfirm(user: PublicUser, submitCode: string) {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user);
		const personalUser = this.db.users.toPersonalJSON(rawUser);

		if (rawUser.emailConfirmed) return { user: personalUser };

		const { newRawUser, success } = await this.db.client.$transaction(async (tx) => {
			const { success } = await this.manager.otp.confirmOtp(
				tx,
				rawUser,
				submitCode,
				OtpTypes.EmailConfirm
			);
			const newRawUser = await this.db.users.update.setEmailConfirmed(tx, rawUser, true);
			return { newRawUser, success };
		});

		if (success)
			this.libs.mail.sendMail(
				rawUser.email,
				'Ваш адрес электронной почты подтверждён',
				'Ваш адрес электронной почты подтверждён',
				'<p>Ваш адрес электронной почты подтверждён</p>'
			);

		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);

		return { user: newPersonalUser };
	}

	async changePasswordRequest(user: PublicUser): Promise<{ user: PersonalUser }> {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user);
		const personalUser = this.db.users.toPersonalJSON(rawUser);

		const rawOtp = await this.manager.otp.createOtp(
			this.db.client,
			rawUser,
			OtpTypes.passwordChange
		);

		if (rawOtp)
			this.libs.mail.sendMail(
				rawUser.email,
				'Код подтверждения',
				`<p>Ваш код подтверждения: ${rawOtp}</p>`,
				`Ваш код подтверждения: ${rawOtp}`
			);

		return { user: personalUser };
	}

	async changePasswordConfirm(
		user: PublicUser,
		password: string,
		submitCode: string
	): Promise<{ user: PersonalUser }> {
		const rawUser = await this.db.users.get.orThrow.byPublicUser(this.db.client, user);
		const hashedPassword = await this.libs.hash.bcrypt.create(password, 10);

		const { newRawUser, success } = await this.db.client.$transaction(async (tx) => {
			const { success } = await this.manager.otp.confirmOtp(
				tx,
				rawUser,
				submitCode,
				OtpTypes.passwordChange
			);
			const newRawUser = await this.db.users.update.setPasswordHash(
				tx,
				rawUser,
				hashedPassword
			);
			return { newRawUser, success };
		});
		if (success)
			this.libs.mail.sendMail(
				rawUser.email,
				'Ваш пароль успешно изменён',
				'Ваш пароль успешно изменён',
				'<p>Ваш пароль успешно изменён</p>'
			);

		const newPersonalUser = this.db.users.toPersonalJSON(newRawUser);

		return { user: newPersonalUser };
	}
}
