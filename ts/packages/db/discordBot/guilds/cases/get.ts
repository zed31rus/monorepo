import type { DiscordBotDBType } from '../../db.js';

export default class GetGuildDbCase {
	orNull = {
		async byGuildId(
			client: DiscordBotDBType.types.Prisma.TransactionClient,
			guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId']
		) {
			return await client.guild.findUnique({
				where: {
					guildId: guildId,
				},
			});
		},

		async byGuildId_Feature(
			client: DiscordBotDBType.types.Prisma.TransactionClient,
			guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
			feature: DiscordBotDBType.types.Features
		) {
			const record = await client.feature.findUnique({
				where: {
					guildId_feature: { guildId: guildId, feature: feature },
				},
				include: {
					Guild: true,
				},
			});

			if (!record) return record;
			const { Guild, ...rest } = record;
			return { ...Guild, features: { [feature]: { ...rest } } };
		},
	};

	orThrow = {
		async byGuildId(
			client: DiscordBotDBType.types.Prisma.TransactionClient,
			guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId']
		) {
			return await client.guild.findUniqueOrThrow({
				where: {
					guildId: guildId,
				},
			});
		},

		async byGuildId_Feature(
			client: DiscordBotDBType.types.Prisma.TransactionClient,
			guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
			feature: DiscordBotDBType.types.Features
		) {
			const record = await client.feature.findUniqueOrThrow({
				where: {
					guildId_feature: { guildId: guildId, feature: feature },
				},
				include: {
					Guild: true,
				},
			});

			const { Guild, ...rest } = record;
			return { ...Guild, features: { [feature]: { ...rest } } };
		},
	};

	many = {
		async whereFeature(
			client: DiscordBotDBType.types.Prisma.TransactionClient,
			feature: DiscordBotDBType.types.Features
		) {
			const records = await client.feature.findMany({
				where: {
					feature: feature,
					status: true,
				},
				include: {
					Guild: true,
				},
			});

			return records.map((record) => {
				const { Guild, ...rest } = record;
				return { ...Guild, features: { [feature]: { ...rest } } };
			});
		},
	};
}
