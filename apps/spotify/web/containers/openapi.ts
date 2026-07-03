import type DailyTrackWebOpenAPI from '#web/openapi/dailyTrack.js';

export default class WebOpenApiContainer {
	constructor(readonly dailyTrack: DailyTrackWebOpenAPI) {}
}
