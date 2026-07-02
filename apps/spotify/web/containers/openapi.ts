import type DailyTrackOpenAPI from '#web/openapi/dailyTrack.js';

export default class OpenApiContainer {
	constructor(readonly dailyTrack: DailyTrackOpenAPI) {}
}
