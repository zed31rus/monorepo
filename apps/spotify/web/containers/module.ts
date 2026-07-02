import type DailyTrackModule from '#web/modules/dailyTrack.js';

export default class ModuleContainer {
	constructor(readonly dailyTrack: DailyTrackModule) {}
}
