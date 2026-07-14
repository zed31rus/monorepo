import type { Features } from '@zed31rus/types';
import type { DiscordBotDBType } from '../../db.js';

export default class GetGuildDbCase {
	orNull = {
		async byId(
			client: DiscordBotDBType.Prisma.TransactionClient,
			guildId: DiscordBotDBType.Prisma.GuildModel['guildId']
		) {
			return client.guild.findUnique({
				where: {
					guildId: guildId,
				},
			});
		},
	};

	orThrow = {
		async byId(
			client: DiscordBotDBType.Prisma.TransactionClient,
			guildId: DiscordBotDBType.Prisma.GuildModel['guildId']
		) {
			return client.guild.findUniqueOrThrow({
				where: {
					guildId: guildId,
				},
			});
		},
	};

	async whereFeature(client: DiscordBotDBType.Prisma.TransactionClient, feature: Features) {
		return client.guild.findMany({
			where: {
				features: {
					path: [feature],
					equals: true,
				},
			},
		});
	}
}
