import BaseEmitter from '#core/base/emitter.js';
import cron from 'node-cron';

export default class DailyTrackSchedullerEmitter extends BaseEmitter {
	protected emitter() {
		cron.schedule(
			'0 * * * *',
			async () => {
				await this.managers.dailyTrack.updateDailyTrack();
			},
			{
				timezone: 'Europe/Moscow',
			}
		);
	}
}
