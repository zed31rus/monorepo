import type { Features } from '@zed31rus/types/features.discordBot.js';
import type { DiscordBotDBType } from '../../../discordbot.db.js';

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
