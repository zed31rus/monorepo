import { PrismaPg } from '@prisma/adapter-pg';
import * as prisma from './generated/prisma/client.js';
import pg from 'pg';
import BaseDb, { type BaseDbArgs } from '../db.base.js';
import ActivityStatusDiscordBotDb from './activityStatus/activityStatus.js';
import GuildsDiscordBotDb from './guilds/guilds.js';
import FeaturesGuildDiscordBotDb from './features/features.js';

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
	features = new FeaturesGuildDiscordBotDb();
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DiscordBotDBType {
	export import types = prisma;

	export type FeaturesSettings = {
		[prisma.Features.serverName]: { names: string[] };
		[prisma.Features.temporaryVoiceChannels]: { channelId: string };
	};

	export type GuildModelWithFeature<F extends prisma.Features> = {
		id: number;
		guildId: string;
		noticeChannelId: string;
		features: {
			[K in F]: FeaturesSettings[K];
		} & Omit<FeaturesSettings, F>;
	};
}

export default DiscordBotDb;
