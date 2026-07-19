import { PrismaPg } from '@prisma/adapter-pg';
import * as prisma from './generated/prisma/client.js';
import pg from 'pg';
import BaseDb, { type BaseDbArgs } from '../db.base.js';
import ActivityStatusDiscordBotDb from './activityStatus/activityStatus.js';
import GuildsDiscordBotDb from './guilds/guilds.js';
import type { Features } from '@zed31rus/types';

class DiscordBotDb extends BaseDb {
	client: prisma.PrismaClient;
	static prisma = prisma.Prisma;

	constructor(...baseArgs: BaseDbArgs) {
		super(...baseArgs);
		const pool = new pg.Pool({ connectionString: this.config.env.DATABASE_URL });
		const adapter = new PrismaPg(pool, { schema: 'discordBot' });
		this.client = new prisma.PrismaClient({ adapter });
	}

	activityStatus = new ActivityStatusDiscordBotDb();
	guilds = new GuildsDiscordBotDb();
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DiscordBotDBType {
	export import Prisma = prisma.Prisma;

	export type GuildModelWithFeature<F extends Features> = {
		id: number;
		guildId: string;
		noticeChannelId: string;
		features: {
			[K in F]: Extract<PrismaJson.features[K], { status: true }>;
		} & Omit<PrismaJson.features, F>;
	};
}

export default DiscordBotDb;
