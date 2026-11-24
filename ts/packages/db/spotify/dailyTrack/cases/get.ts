import type { SpotifyDbType } from '../../db.js';

export default class GetCaseDailyTrackSpotifyDb {
	orNull = {
		async get(client: SpotifyDbType.TransactionClient) {
			return await client.dailyTrack.findUnique({
				where: {
					id: 1,
				},
			});
		},
	};

	orThrow = {
		async get(client: SpotifyDbType.TransactionClient) {
			return await client.dailyTrack.findUniqueOrThrow({
				where: {
					id: 1,
				},
			});
		},
	};
}
