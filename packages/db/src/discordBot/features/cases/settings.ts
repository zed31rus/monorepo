import type { DiscordBotDBType } from '../../db.js';

export default class SettingsFeatureGuildDiscordBotDbCase {
	async update<F extends DiscordBotDBType.types.Features>(
		client: DiscordBotDBType.types.Prisma.TransactionClient,
		guild: DiscordBotDBType.types.Prisma.GuildModel,
		feature: F,
		settings: DiscordBotDBType.FeaturesSettings[F]
	) {
		client.feature.update({
			where: {
				guildId_feature: {
					guildId: guild.guildId,
					feature: feature,
				},
			},
			data: {
				settings: settings,
			},
		});
	}
}
