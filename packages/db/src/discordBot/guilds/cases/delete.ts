import type { DiscordBotDBType } from '../../db.js';

export default class DeleteGuildDbCase {
	async create(
		client: DiscordBotDBType.types.Prisma.TransactionClient,
		guild: DiscordBotDBType.types.Prisma.GuildModel
	) {
		return client.guild.delete({
			where: {
				guildId: guild.guildId,
			},
		});
	}
}
