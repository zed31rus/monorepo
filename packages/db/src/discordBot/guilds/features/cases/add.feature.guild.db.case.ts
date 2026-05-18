import type { Features } from '@zed31rus/types/features.discordBot.js';
import type { DiscordBotDBType } from '../../../discordbot.db.js';

export default class AddFeatureGuildDiscordBotDbCase {
    async add(
        client: DiscordBotDBType.TransactionClient,
        guild: DiscordBotDBType.GuildModel,
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
