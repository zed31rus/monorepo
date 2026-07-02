import { SpotifyDbType } from '../../spotify.db.js';

export default class UpsertCaseDailyTrackSpotifyDb {
	async upsert(client: SpotifyDbType.TransactionClient, trackId: string) {
		return await client.dailyTrack.upsert({
			where: { id: 1 },
			update: { trackId: trackId },
			create: {
				id: 1,
				trackId: trackId,
			},
		});
	}
}
