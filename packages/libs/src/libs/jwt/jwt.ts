import BaseLib from '../../base.js';
import jsonWebToken from 'jsonwebtoken';
import { type SignOptions } from 'jsonwebtoken';

class JwtLib extends BaseLib {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async create(payload: any, expiresIn: SignOptions['expiresIn'], JWT_SECRET: string) {
		return jsonWebToken.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
	}

	async verify(token: string, JWT_SECRET: string) {
		return jsonWebToken.verify(token, JWT_SECRET);
	}

	getExpires() {
		const time = this.getExpiresTime();
		const atTime = this.getExpiresAtTime(time);
		const expires: JWTExpires = {
			time,
			atTime,
		};
		return expires;
	}

	private getExpiresAtTime(expiresTime: number) {
		return new Date(Date.now() + expiresTime);
	}

	private getExpiresTime() {
		return 15 * 60 * 1000;
	}
}

export type JWTExpires = {
	time: number;
	atTime: Date;
};

export default JwtLib;
