import { PrismaPg } from '@prisma/adapter-pg';
import * as prisma from './generated/prisma/client.js';
import pg from 'pg';
import BaseDb, { type BaseDbArgs } from '../db.base.js';

class SpotifyDb extends BaseDb {
	client: prisma.PrismaClient;
	static prisma = prisma.Prisma;

	constructor(...baseArgs: BaseDbArgs) {
		super(...baseArgs);
		const pool = new pg.Pool({ connectionString: this.config.env.DATABASE_URL });
		const adapter = new PrismaPg(pool, { schema: 'spotify' });
		this.client = new prisma.PrismaClient({ adapter });
	}

	readonly dailyTrack = new DailyTrackSpotifyDb();
}

export import SpotifyDbType = prisma.Prisma;
import DailyTrackSpotifyDb from './dailyTrack/dailyTrack.js';

export default SpotifyDb;
