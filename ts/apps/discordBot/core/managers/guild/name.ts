import BaseGuildManager from '#core/base/manager/guild.js';
import { InternalErrors } from '@shared/errors';
import cron from 'node-cron';
import { DiscordBotDBType } from '@packages/db';

export default class ServerNameGuildManager extends BaseGuildManager {
	cronSchedule?: cron.ScheduledTask;

	init() {
		this.updateRandomGuildName();
		this.createCronSchedule();
	}

	async updateRandomGuildName() {
		const guildRecord = await this.db.guilds.get.orThrow.byGuildId_Feature(
			this.db.client,
			this.guildId,
			DiscordBotDBType.types.Features.serverName
		);
		const guild =
			this.client.guilds.cache.get(this.guildId) ??
			(await this.client.guilds.fetch(this.guildId));

		const guildNames = guildRecord.features[0].settings.names;
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
