import GetVerificationCode from './cases/get.js';
import DeleteVerificationCode from './cases/delete.js';
import UpsertVerificationCode from './cases/upsert.js';

export default class VerificationCode {
	get = new GetVerificationCode();
	upsert = new UpsertVerificationCode();
	delete = new DeleteVerificationCode();
}
