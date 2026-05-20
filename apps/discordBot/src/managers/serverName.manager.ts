import cron from 'node-cron';
import { Features } from '@zed31rus/types/features.discordBot.js';
import BaseManager, { type BaseManagerArgs } from '#discordBot/base/manager.base.js';

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
		const oldName = guild.name;
		let newServerName;

		do {
			newServerName = await this.db.serverName.get.random(this.db.client);
		} while (newServerName.name === oldName);

		this.events.emit('serverNameUpdate', {
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
