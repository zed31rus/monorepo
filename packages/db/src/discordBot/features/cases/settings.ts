import type { DiscordBotDBType } from '../../db.js';

const update = async <F extends DiscordBotDBType.types.Features>(
	client: DiscordBotDBType.types.Prisma.TransactionClient,
	guild: DiscordBotDBType.types.Prisma.GuildModel,
	feature: F,
	settings: DiscordBotDBType.FeaturesSettings[F]
) => {
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
};

update.byGuildId = async <F extends DiscordBotDBType.types.Features>(
	client: DiscordBotDBType.types.Prisma.TransactionClient,
	guildId: DiscordBotDBType.types.Prisma.GuildModel['guildId'],
	feature: F,
	settings: DiscordBotDBType.FeaturesSettings[F]
) => {
	client.feature.update({
		where: {
			guildId_feature: {
				guildId: guildId,
				feature: feature,
			},
		},
		data: {
			settings: settings,
		},
	});
};

export default class SettingsFeatureGuildDiscordBotDbCase {
	update = update;
}
