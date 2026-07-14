import type { DiscordBotDBType } from '../../db.js';

export default class DeleteGuildDbCase {
	async create(
		client: DiscordBotDBType.Prisma.TransactionClient,
		guild: DiscordBotDBType.Prisma.GuildModel
	) {
		return client.guild.delete({
			where: {
				guildId: guild.guildId,
			},
		});
	}
}
