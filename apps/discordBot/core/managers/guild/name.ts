import BaseGuildManager from '#core/base/guild/manager.js';
import { InternalErrors } from '@shared/errors';
import { Features } from '@zed31rus/types';
import cron from 'node-cron';

export default class NameGuildManager extends BaseGuildManager {
	cronSchedule?: cron.ScheduledTask;

	init() {
		this.updateRandomGuildName();
		this.createCronSchedule();
	}

	async updateRandomGuildName() {
		const guildRecord = await this.db.guilds.get.orThrow.byId.whereFeature(
			this.db.client,
			this.guildId,
			Features.serverName
		);
		const guild =
			this.client.guilds.cache.get(this.guildId) ??
			(await this.client.guilds.fetch(this.guildId));

		const guildNames = guildRecord.features.serverName.settings.names;
		if (!guildNames.length)
			throw this.errors.internal.businessLogic(
				InternalErrors.BusinessLogicErrorMessage.NO_AVAILABLE_OPTIONS
			);
		const randomNameIndex = Math.floor(Math.random() * guildNames.length);
		const newguildName = guildNames[randomNameIndex];

		await guild.setName(newguildName);
	}

	private createCronSchedule() {
		this.cronSchedule = cron.schedule(
			'*/10 * * * *',
			() => {
				this.updateRandomGuildName();
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
