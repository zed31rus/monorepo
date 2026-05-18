import type { DiscordBotDBType } from '../../discordbot.db.js';

export default class CreateGuildDbCase {
	async create(client: DiscordBotDBType.TransactionClient, guildId: string) {
		return client.guild.create({
			data: {
				guildId: guildId,
				features: {
					voice: {
						status: false,
					},
					serverName: {
						status: false,
					},
				},
			},
		});
	}
}
