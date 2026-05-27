import BaseManager, { type BaseManagerArgs } from '#discordBot/base/manager.base.js';
import { ActivityType } from 'discord.js';
import cron from 'node-cron';

interface Activity {
	type: ActivityType;
	name: string;
}

export default class ActivityManager extends BaseManager {
	private currentActivity: Activity;

	constructor(...managerBaseArgs: BaseManagerArgs) {
		super(...managerBaseArgs);
		this.currentActivity = { type: ActivityType.Custom, name: 'Загрузка...' };

		this.init();
	}

	private async init() {
		this.currentActivity = await this.db.activityStatus.get.random(this.db.client);
		this.createCronSchedule();
	}

	private async updateRandomActivity() {
		let newActivity: Activity;
		do {
			newActivity = await this.db.activityStatus.get.random(this.db.client);
		} while (newActivity.name === this.currentActivity.name);

		this.currentActivity = newActivity;
		this.client.user.setActivity(this.currentActivity.name, {
			type: this.currentActivity.type,
		});
		this.events.internal.emit('activityUpdated', this.currentActivity);
	}

	private createCronSchedule() {
		cron.schedule(
			'*/5 * * * *',
			async () => {
				await this.updateRandomActivity();
			},
			{
				timezone: 'Europe/Moscow',
			}
		);
	}
}
