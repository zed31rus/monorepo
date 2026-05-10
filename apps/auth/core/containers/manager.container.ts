import OtpManager from "#root/core/managers/otp.manager.js";
import SessionManager from "#root/core/managers/session.manager.js";

export default class ManagerContainer {
    constructor(
        readonly otp: OtpManager,
        readonly session: SessionManager,
    ) {}
}