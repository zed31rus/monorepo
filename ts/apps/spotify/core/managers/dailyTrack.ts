import { InternalErrors } from '@shared/errors';
import BaseManager from '../base/manager.js';

export default class DailyTrackManager extends BaseManager {
	public async updateDailyTrack() {
		const preferedPlaylistResponse = await this.executeSpotify(() =>
			this.instances.SpotifyApi.client.getPlaylist(this.config.env.SPOTIFY_PRIMARY_PLAYLIST)
		);

		const preferedPlaylist = preferedPlaylistResponse.body;

		if (!preferedPlaylist?.items?.items) {
			throw this.errors.internal.spotify(InternalErrors.SpotifyErrorMessage.INVALID_RESPONSE);
		}

		const preferedPlaylistTracks = preferedPlaylist.items.items;

		if (preferedPlaylistTracks.length === 0) {
			throw this.errors.internal.spotify(InternalErrors.SpotifyErrorMessage.PLAYLIST_EMPTY);
		}

		const randomIndex = Math.floor(Math.random() * preferedPlaylistTracks.length);
		const randomTrack = preferedPlaylistTracks[randomIndex];

		if (!randomTrack.item?.id) {
			throw this.errors.internal.spotify(InternalErrors.SpotifyErrorMessage.TRACK_WITHOUT_ID);
		}

		await this.db.dailyTrack.upsert.upsert(this.db.client, randomTrack.item.id);
	}

	public async getDailyTrack() {
		const dailyTrackRecord = await this.db.dailyTrack.get.orThrow.get(this.db.client);

		const dailyTrackResponse = await this.executeSpotify(() =>
			this.instances.SpotifyApi.client.getTrack(dailyTrackRecord.trackId)
		);

		return dailyTrackResponse.body;
	}
}
