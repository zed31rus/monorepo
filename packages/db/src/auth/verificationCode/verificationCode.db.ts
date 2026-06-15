import GetVerificationCode from './cases/getVerificationCode.db.case.js';
import DeleteVerificationCode from './cases/deleteVerificationCode.db.case.js';
import UpsertVerificationCode from './cases/upsertVerificationCode.db.case.js';

export default class verificationCode {
	get = new GetVerificationCode();
	upsert = new UpsertVerificationCode();
	delete = new DeleteVerificationCode();
}
