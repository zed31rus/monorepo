import { ActivityType } from "discord.js";
import cron from 'node-cron';
import BaseService from "../base/service.base";

interface Activity {
    type: ActivityType;
    name: string;
}

export default class ActivityService extends BaseService {
    private currentActivity: Activity;

    constructor(...serviceBaseArgs: BaseService.Args) {
        super(...serviceBaseArgs);
        this.currentActivity = { type: ActivityType.Custom, name: "Загрузка..." };

        this.init()
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
        this.events.emit('activityUpdate', this.currentActivity);
    }

    private createCronSchedule() {
        cron.schedule('*/5 * * * *', async () => {
            await this.updateRandomActivity();
        }, {
            timezone: "Europe/Moscow",
        });
    }
}