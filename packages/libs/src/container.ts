import Hashs from './libs/hash/hash.js';
import I18n from './libs/i18n/i18n.js';
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
		readonly verificationCode: VerificationCodes,
		readonly localisation: I18n
	) {}

	static deps = {
		Hash: Hashs,
		JWT: JWTs,
		Mail: Mails,
		RefreshToken: RefreshTokens,
		VerificationCode: VerificationCodes,
		localisation: I18n,
	};
}
export type JWTExpires = JWTExpiress;

export type RefreshTokenExpires = RefreshTokenExpiress;

export default LibContainer;
