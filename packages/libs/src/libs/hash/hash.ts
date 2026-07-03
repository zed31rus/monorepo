import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import BaseLib from '../../base.js';

class HashLib extends BaseLib {
	public bcrypt = {
		async create(password: string, saltRounds: number) {
			return await bcrypt.hash(password, saltRounds);
		},
		async compare(password: string, hash: string) {
			return await bcrypt.compare(password, hash);
		},
	};
	public sha256 = {
		async create(password: string) {
			return crypto.createHash('sha256').update(password).digest('hex');
		},
	};
}

export default HashLib;
