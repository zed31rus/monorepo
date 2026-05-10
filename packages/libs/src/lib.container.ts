import Hashs from "./libs/hash/hash.lib.js";
import JWTs from "./libs/jwt/jwt.lib.js";
import Mails from "./libs/mail/mail.lib.js";
import RefreshTokens from "./libs/refreshToken/refreshToken.lib.js";
import VerificationCodes from "./libs/verificationCode/verificationCode.lib.js";

class LibContainer {
    constructor(
        readonly hash: Hashs,
        readonly jwt: JWTs,
        readonly mail: Mails,
        readonly refreshToken: RefreshTokens,
        readonly verificationCode:VerificationCodes,
    ){}
    
    static deps = { Hash: Hashs, JWT: JWTs, Mail: Mails, RefreshToken: RefreshTokens, VerificationCode: VerificationCodes }

}

namespace LibContainer {
    export namespace Hash {
        
    }
    export namespace JWT {
        export type Expires = JWTs.Expires
    }
    export namespace Mail {

    }
    export namespace RefreshToken {
        export type Expires = RefreshTokens.Expires
    }
    export namespace VerificationCode {

    }
}

export default LibContainer

