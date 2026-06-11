import cron from 'node-cron';
import BaseManager, { type BaseManagerArgs } from '#discordBot/base/manager.base.js';
import { Features } from '@zed31rus/types';

export default class ServerNameManager extends BaseManager {
	constructor(...managerBaseArgs: BaseManagerArgs) {
		super(...managerBaseArgs);
		this.init();
	}

	private async init() {
		await this.updateAllServerNames();
		this.createCronSchedule();
	}

	private async updateAllServerNames() {
		try {
			const activeGuilds = await this.db.guilds.get.whereFeature(
				this.db.client,
				Features.serverName
			);

			for (const guild of activeGuilds) {
				await this.updateServerName(guild.guildId);
			}
		} catch (error) {
			this.logger.error('Failed to refresh server names:', error);
		}
	}

	public async updateServerName(serverId: string) {
		const guild = await this.client.guilds.fetch(serverId);

		const newServerName = await this.db.serverName.get.random(this.db.client);

		if (newServerName) {
			guild.setName(newServerName.name);
		}

		this.events.internal.emit('serverNameUpdate', {
			serverId,
			newName: newServerName.name,
		});
	}

	private createCronSchedule() {
		cron.schedule(
			'*/10 * * * *',
			async () => {
				await this.updateAllServerNames();
			},
			{
				timezone: 'Europe/Moscow',
			}
		);
	}
}
