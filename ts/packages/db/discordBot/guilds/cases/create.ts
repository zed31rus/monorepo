import type { DiscordBotDBType } from '../../db.js';

export default class CreateGuildDbCase {
	async create(
		client: DiscordBotDBType.types.Prisma.TransactionClient,
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId']
	) {
		return client.guild.create({
			data: {
				guildId: guildId,
			},
		});
	}
}
