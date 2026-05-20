import BaseManager from '#core/base/manager.base.js';
import type { AuthDBType, RawUser } from '@packages/db';
import type LibContainer from '@packages/libs';

export type SessionType = {
	refresh: {
		token: string;
		expires: LibContainer.RefreshToken.Expires;
	};
	access: {
		token: string;
		expires: LibContainer.JWT.Expires;
	};
};

export default class SessionManager extends BaseManager {
	async createSession(user: RawUser, tx: AuthDBType.TransactionClient): Promise<SessionType> {
		const rawUser = user;
		const publicUser = this.db.users.toPublicJSON(rawUser);

		const refreshTokenExpires = this.libs.refreshToken.getExpires();
		const refreshToken = this.libs.refreshToken.create();
		const refreshTokenHashed = await this.libs.hash.sha256.create(refreshToken);
		await this.db.refreshToken.create.create(
			tx,
			refreshTokenHashed,
			refreshTokenExpires.atTime,
			rawUser
		);

		const accessTokenExpires = this.libs.jwt.getExpires();
		const accessToken = await this.libs.jwt.create(
			publicUser,
			accessTokenExpires.time,
			this.config.env.JWT_SECRET
		);

		return {
			refresh: { token: refreshToken, expires: refreshTokenExpires },
			access: { token: accessToken, expires: accessTokenExpires },
		};
	}
}
