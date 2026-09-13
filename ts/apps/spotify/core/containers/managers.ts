import type DailyTrackManager from '../managers/dailyTrack.js';

export default class ManagerContainer {
	constructor(readonly dailyTrack: DailyTrackManager) {}
}
