import type DailyTrackSchedullerEmitter from '#core/emitters/schedullers/dailyTrack.js';

export default class EmitterContainer {
	constructor(
		readonly scheduller: {
			readonly dailyTrack: DailyTrackSchedullerEmitter;
		}
	) {}
}
