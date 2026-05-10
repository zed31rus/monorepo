import BaseLib from "../../lib.base.js";
import jsonWebToken from "jsonwebtoken";
import { type SignOptions } from 'jsonwebtoken';

class JWT extends BaseLib {
    async create(payload: any, expiresIn: SignOptions['expiresIn'], JWT_SECRET: string) {
        return jsonWebToken.sign(payload, JWT_SECRET, {expiresIn: expiresIn});
    }

    async verify(token: string, JWT_SECRET: string) {
        return jsonWebToken.verify(token, JWT_SECRET);
    }

    getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        const expires: JWT.Expires = {
            time,
            atTime
        }
        return expires
    }

    private getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime);
    }

    private getExpiresTime() {
        return (15 * 60 * 1000);
    }
}

namespace JWT {
    export type Expires = {
        time: number,
        atTime: Date
    }
}

export default JWT;