import type { Features } from '@zed31rus/types';
import type { DiscordBotDBType } from '../../db.js';

const byIdOrThrow = async (
	client: DiscordBotDBType.Prisma.TransactionClient,
	guildId: DiscordBotDBType.Prisma.GuildModel['guildId']
) => {
	return client.guild.findUniqueOrThrow({
		where: {
			guildId: guildId,
		},
	});
};

byIdOrThrow.whereFeature = async (
	client: DiscordBotDBType.Prisma.TransactionClient,
	guildId: DiscordBotDBType.Prisma.GuildModel['guildId'],
	feature: Features
) => {
	return client.guild.findUniqueOrThrow({
		where: {
			guildId: guildId,
			features: {
				path: [feature],
				equals: true,
			},
		},
	}) as Promise<DiscordBotDBType.GuildModelWithFeature<typeof feature>>;
};

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
		byId: byIdOrThrow,
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
