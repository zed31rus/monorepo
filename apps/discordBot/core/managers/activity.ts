import BaseManager from '#core/base/manager.js';
import cron from 'node-cron';

export default class ActivityManager extends BaseManager {
	cronSchedule?: cron.ScheduledTask;

	async init() {
		await this.updateRandomActivity();
		this.createCronSchedule();
	}

	async updateRandomActivity() {
		const activity = await this.db.activityStatus.get.random(this.db.client);

		if (!activity) {
			this.client.user.setPresence({
				activities: [],
			});
			return;
		}

		this.client.user.setActivity(activity.name, {
			type: activity.type,
		});
	}

	private createCronSchedule() {
		this.cronSchedule = cron.schedule(
			'*/10 * * * *',
			() => {
				this.updateRandomActivity();
			},
			{
				timezone: 'Europe/Moscow',
			}
		);
		this.cronSchedule.start();
	}

	destroy() {
		if (this.cronSchedule) this.cronSchedule.stop();
	}
}
