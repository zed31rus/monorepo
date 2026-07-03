import Hashs from './libs/hash/hash.js';
import JWTs, { type JWTExpires as JWTExpiress } from './libs/jwt/jwt.js';
import Mails from './libs/mail/mail.js';
import RefreshTokens, {
	type RefreshTokenExpires as RefreshTokenExpiress,
} from './libs/refreshToken/refreshToken.js';
import VerificationCodes from './libs/verificationCode/verificationCode.js';

class LibContainer {
	constructor(
		readonly hash: Hashs,
		readonly jwt: JWTs,
		readonly mail: Mails,
		readonly refreshToken: RefreshTokens,
		readonly verificationCode: VerificationCodes
	) {}

	static deps = {
		Hash: Hashs,
		JWT: JWTs,
		Mail: Mails,
		RefreshToken: RefreshTokens,
		VerificationCode: VerificationCodes,
	};
}
export type JWTExpires = JWTExpiress;

export type RefreshTokenExpires = RefreshTokenExpiress;

export default LibContainer;
