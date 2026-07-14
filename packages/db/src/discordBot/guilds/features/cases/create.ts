import type { Features } from '@zed31rus/types';
import type { DiscordBotDBType } from '../../../db.js';

export default class CreateFeatureGuildDiscordBotDbCase {
	async add(
		client: DiscordBotDBType.Prisma.TransactionClient,
		guild: DiscordBotDBType.Prisma.GuildModel,
		feature: Features
	) {
		return client.guild.update({
			where: { id: guild.id },
			data: {
				features: { ...guild.features, [feature]: true },
			},
		});
	}
}
