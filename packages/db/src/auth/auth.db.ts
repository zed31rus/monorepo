import { PrismaPg } from '@prisma/adapter-pg';
import * as prisma from './generated/prisma/client.js';
import Users from './user/user.class.js';
import refreshToken from './refreshToken/refreshToken.class.js';
import oauthAccount from './oauth/oauth.class.js';
import verificationCode from './verificationCode/verificationCode.class.js';
import pg from 'pg';
import BaseDb, { type BaseDbArgs } from '../db.base.js';
import {
	type PublicUser as PubUser,
	type PersonalUser as PerUser,
	type InternalUser as IntUser,
} from './user/user.class.js';

class authDB extends BaseDb {
	client: prisma.PrismaClient;
	static prisma = prisma.Prisma;

	constructor(...baseArgs: BaseDbArgs) {
		super(...baseArgs);
		const pool = new pg.Pool({ connectionString: this.config.env.DATABASE_URL });
		const adapter = new PrismaPg(pool, { schema: 'auth' });
		this.client = new prisma.PrismaClient({ adapter });
	}

	users = new Users();
	refreshToken = new refreshToken();
	oauthAccount = new oauthAccount();
	verificationCode = new verificationCode();
}

export import AuthDBType = prisma.Prisma;
export type RawUser = prisma.Prisma.UserGetPayload<{ include: { oauthAccounts: true } }>;
export type PublicUser = PubUser;
export type PersonalUser = PerUser;
export type InternalUser = IntUser;

export default authDB;
