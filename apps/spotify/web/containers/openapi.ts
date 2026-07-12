import type DailyTrackWebOpenAPI from '#web/openapi/external/dailyTrack.js';

export default class WebOpenApiContainer {
	constructor(readonly dailyTrack: DailyTrackWebOpenAPI) {}
}
