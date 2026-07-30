import { DiscordBotDBType } from '../../db.js';

export default class StatusFeatureGuildDiscordBotDbCase {
	async enable(
		client: DiscordBotDBType.types.Prisma.TransactionClient,
		guild: DiscordBotDBType.types.Prisma.GuildModel,
		feature: DiscordBotDBType.types.Features
	) {
		client.feature.update({
			where: {
				guildId_feature: { guildId: guild.guildId, feature: feature },
			},
			data: {
				status: true,
			},
		});
	}

	async disable(
		client: DiscordBotDBType.types.Prisma.TransactionClient,
		guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
		feature: DiscordBotDBType.types.Features
	) {
		client.feature.update({
			where: {
				guildId_feature: {
					guildId: guildId,
					feature: feature,
				},
			},
			data: {
				status: false,
			},
		});
	}
}
