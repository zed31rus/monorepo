import GetCaseDailyTrackSpotifyDb from './cases/get.js';
import UpsertCaseDailyTrackSpotifyDb from './cases/upsert.js';

export default class DailyTrackSpotifyDb {
	readonly get = new GetCaseDailyTrackSpotifyDb();
	readonly upsert = new UpsertCaseDailyTrackSpotifyDb();
}
