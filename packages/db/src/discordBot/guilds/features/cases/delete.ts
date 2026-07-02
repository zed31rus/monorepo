import type { Features } from '@zed31rus/types';
import type { DiscordBotDBType } from '../../../db.js';

export default class DeleteFeatureGuildDiscordBotDbCase {
	async add(
		client: DiscordBotDBType.TransactionClient,
		guild: DiscordBotDBType.GuildModel,
		feature: Features
	) {
		const features = { ...guild.features };
		if (!features[feature]) return guild;
		delete features[feature];
		return client.guild.update({
			where: { id: guild.id },
			data: {
				features: features,
			},
		});
	}
}
