import type DailyTrackWebModule from '#web/modules/dailyTrack.js';

export default class WebModuleContainer {
	constructor(readonly dailyTrack: DailyTrackWebModule) {}
}
