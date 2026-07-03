import BaseService from '#core/base/service.js';
import { ApiErrors } from '@shared/errors';

export default class AuthService extends BaseService {
	async register(login: string, email: string, password: string, nickname: string) {
		const hashedPassword = await this.libs.hash.bcrypt.create(password, 10);

		const rawUser = await this.db.users.create.create(
			this.db.client,
			nickname,
			login,
			email,
			hashedPassword,
			false
		);
		const publicUser = this.db.users.toPublicJSON(rawUser);

		return { user: publicUser };
	}

	async login(email: string, password: string) {
		const rawUser = await this.db.users.get.orThrow.byEmail(this.db.client, email);
		const personalUser = this.db.users.toPersonalJSON(rawUser);
		const isPasswordCorrect = await this.libs.hash.bcrypt.compare(
			password,
			rawUser.passwordHash!
		);
		if (!isPasswordCorrect)
			throw this.errors.api.unauthorized(ApiErrors.UnauthorizedMessage.INVALID_CREDENTIALS);

		const session = await this.manager.session.createSession(rawUser, this.db.client);

		return { user: personalUser, ...session };
	}

	async refresh(incomingRefreshToken: string) {
		const hashedIncomingToken = await this.libs.hash.sha256.create(incomingRefreshToken);
		const incomingRefreshTokenRecord = await this.db.refreshToken.get.orThrow.byHashedToken(
			this.db.client,
			hashedIncomingToken
		);

		const expired = this.libs.refreshToken.checkExpired(incomingRefreshTokenRecord);
		if (expired) {
			await this.db.refreshToken.delete.byRecord(this.db.client, incomingRefreshTokenRecord);
			throw this.errors.api.unauthorized(ApiErrors.UnauthorizedMessage.INVALID_TOKEN);
		}

		const rawUser = incomingRefreshTokenRecord.user;
		const personalUser = this.db.users.toPersonalJSON(rawUser);

		const session = await this.db.client.$transaction(async (tx) => {
			await this.db.refreshToken.delete.byRecord(tx, incomingRefreshTokenRecord);

			const session = await this.manager.session.createSession(rawUser, tx);
			return session;
		});

		return { user: personalUser, ...session };
	}

	async logout(incomingRefreshToken: string) {
		const hashedIncomingToken = await this.libs.hash.sha256.create(incomingRefreshToken);
		const incomingRefreshTokenRecord = await this.db.refreshToken.get.orNull.byHashedToken(
			this.db.client,
			hashedIncomingToken
		);
		if (incomingRefreshTokenRecord) {
			await this.db.refreshToken.delete.byRecord(this.db.client, incomingRefreshTokenRecord);
		}
		return {};
	}
}
