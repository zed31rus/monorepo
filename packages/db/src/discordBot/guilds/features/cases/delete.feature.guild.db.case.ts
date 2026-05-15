import type { Features } from "@zed31rus/types/features.discordBot.js";
import type DiscordBotDB from "../../../discordbot.db.js";

export default class DeleteFeatureGuildDiscordBotDbCase {
    async add(client: DiscordBotDB.TransactionClient, guild: DiscordBotDB.Guild.Model, feature: Features) {
        const features = {...guild.features as any};
        if (!features[feature]) return;
        delete features[feature]
        return client.guild.update({
            where: { id: guild.id },
            data: {
                features: features
            }
        })
    }
}