import OtpManager from '#core/managers/otp.js';
import SessionManager from '#core/managers/session.js';

export default class ManagerContainer {
	constructor(
		readonly otp: OtpManager,
		readonly session: SessionManager
	) {}
}
