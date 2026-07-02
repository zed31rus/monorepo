import BaseService from '../base/services.js';

export default class PlaylistService extends BaseService {
	async dailyTrack() {
		const dailyTrack = await this.managers.dailyTrack.getDailyTrack();

		return { dailyTrack };
	}
}
