import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import BaseLib from '../../base.js';
import argon2 from 'argon2';

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
	public argon2 = {
		async create(password: string) {
			return await argon2.hash(password, {
				type: argon2.argon2id,
				memoryCost: 65536, // 64 MB
				timeCost: 3,
				parallelism: 4,
			});
		},

		async compare(password: string, hash: string) {
			return await argon2.verify(hash, password);
		},
	};
}

export default HashLib;
