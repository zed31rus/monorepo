import BaseModule from '#web/base/module.js';

export default class DailyTrackModule extends BaseModule {
	init() {
		this.router.use(this.wrappers.rateLimiter.limit(15 * 60 * 1000, 10));

		this.router.openapi(this.openapi.dailyTrack.get, async (c) => {
			const { dailyTrack } = await this.core.services.playlist.dailyTrack();
			return c.json({ track: dailyTrack });
		});
	}
}
