import BaseLib from "../../lib.base.js";
import crypto from "node:crypto"

class RefreshToken extends BaseLib {
    create() {
        return crypto.randomBytes(64).toString("hex");
    }

    getExpires() {
        const time = this.getExpiresTime();
        const atTime = this.getExpiresAtTime(time);
        const expires: RefreshToken.Expires = {
            time,
            atTime
        }
        return expires
    }

    checkExpired(token: { expiresAt: Date }) {
        if (new Date() > new Date(token.expiresAt)) {
                return true
            }
        return false
    }
    
    private getExpiresAtTime(expiresTime: number) {
        return new Date(Date.now() + expiresTime)
    }

    private getExpiresTime() {
        return (14 * 24 * 60 * 60 * 1000)
    }
}

namespace RefreshToken {
    export type Expires = {
        time: number,
        atTime: Date
    }
}

export default RefreshToken;