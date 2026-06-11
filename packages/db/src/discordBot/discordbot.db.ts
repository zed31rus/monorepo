import { PrismaPg } from '@prisma/adapter-pg';
import * as prisma from './generated/prisma/client.js';
import pg from 'pg';
import BaseDb, { type BaseDbArgs } from '../db.base.js';
import ActivityStatusDiscordBotDb from './activityStatus/activityStatus.discordbot.db.js';
import ServerName from './serverName/serverName.db.js';
import GuildsDiscordBotDb from './guilds/guilds.discordbot.db.js';

class DiscordBotDB extends BaseDb {
	client: prisma.PrismaClient;
	static prisma = prisma.Prisma;

	constructor(...baseArgs: BaseDbArgs) {
		super(...baseArgs);
		const pool = new pg.Pool({ connectionString: this.config.env.DATABASE_URL });
		const adapter = new PrismaPg(pool, { schema: 'discordBot' });
		this.client = new prisma.PrismaClient({ adapter });
	}

	activityStatus = new ActivityStatusDiscordBotDb();
	serverName = new ServerName();
	guilds = new GuildsDiscordBotDb();
}

export import DiscordBotDBType = prisma.Prisma;

export default DiscordBotDB;
