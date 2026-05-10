import { PrismaPg } from "@prisma/adapter-pg";
import * as prisma from './generated/prisma/client.js'
import Users from "./user/user.class.js";
import refreshToken from "./refreshToken/refreshToken.class.js";
import oauthAccount from "./oauth/oauth.class.js";
import verificationCode from "./verificationCode/verificationCode.class.js";
import pg from "pg";
import BaseDb from "../db.base.js";

class authDB extends BaseDb {
    client: prisma.PrismaClient
    static prisma = prisma.Prisma
    
    constructor(...baseArgs: BaseDb.Args) {
        super(...baseArgs);
        const pool = new pg.Pool({connectionString: this.config.env.DATABASE_URL})
        const adapter = new PrismaPg(pool, {schema: "auth"})
        this.client = new prisma.PrismaClient({ adapter });
    }

    users = new Users();
    refreshToken = new refreshToken();
    oauthAccount = new oauthAccount();
    verificationCode = new verificationCode();

}

namespace authDB {
    export namespace User {
        export type Raw = prisma.User;
        export type Public = Users.PublicUser;
        export type Personal = Users.PersonalUser;
    };
    export type PrismaClient = prisma.PrismaClient;
    export type RefreshToken = prisma.RefreshToken;
    export type VerificationCode = prisma.VerificationCode;
    export type OauthAccount = prisma.OauthAccount;
    export type TransactionClient = prisma.Prisma.TransactionClient;
    export type OauthAccountCreateWithoutUserInput = prisma.Prisma.OauthAccountCreateWithoutUserInput;
    export type OauthAccountUpdateInput = prisma.Prisma.OauthAccountUpdateInput;
    export type InputJsonValue = prisma.Prisma.InputJsonValue;
    export type UserModel = prisma.Prisma.UserModel;
    export type RefreshTokenModel = prisma.Prisma.RefreshTokenModel;
    export type JsonObject = prisma.Prisma.JsonObject;
    export type VerificationCodeModel = prisma.Prisma.VerificationCodeModel;
    export import PrismaClientKnownRequestError = prisma.Prisma.PrismaClientKnownRequestError;
    export import PrismaClientValidationError = prisma.Prisma.PrismaClientValidationError;
}

export default authDB;