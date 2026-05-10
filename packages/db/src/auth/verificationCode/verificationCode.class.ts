import GetVerificationCode from "./classes/getVerificationCode.js";
import DeleteVerificationCode from "./classes/deleteVerificationCode.js";
import UpsertVerificationCode from "./classes/upsertVerificationCode.js";

export default class verificationCode {
    get = new GetVerificationCode();
    upsert = new UpsertVerificationCode();
    delete = new DeleteVerificationCode();
}