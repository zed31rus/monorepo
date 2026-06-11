import BaseManager, { type BaseManagerArgs } from '#discordBot/base/manager.base.js';
import { ActivityType } from 'discord.js';
import cron from 'node-cron';

interface Activity {
	type: ActivityType;
	name: string;
}

export default class ActivityManager extends BaseManager {
	private currentActivity: Activity | null;

	constructor(...managerBaseArgs: BaseManagerArgs) {
		super(...managerBaseArgs);
		this.currentActivity = { type: ActivityType.Custom, name: 'Загрузка...' };

		this.init();
	}

	private async init() {
		const activity = await this.db.activityStatus.get.random(this.db.client);

		if (!activity) {
			this.currentActivity = null;
			this.client.user.setPresence({ activities: [] });
		} else {
			this.currentActivity = activity;
			this.client.user.setActivity(activity.name, { type: activity.type });
		}

		this.createCronSchedule();
	}

	private async updateRandomActivity() {
		const checkAny = await this.db.activityStatus.get.random(this.db.client);
		if (!checkAny) {
			this.currentActivity = null;
			this.client.user.setPresence({ activities: [] });
			return;
		}

		const newActivity = await this.db.activityStatus.get.random(this.db.client);

		if (newActivity) {
			this.currentActivity = newActivity;
			this.client.user.setActivity(this.currentActivity.name, {
				type: this.currentActivity.type,
			});
			this.events.internal.emit('activityUpdated', this.currentActivity);
		}
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
