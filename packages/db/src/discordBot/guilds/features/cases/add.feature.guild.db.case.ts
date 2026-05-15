import type { Features } from "@zed31rus/types/features.discordBot.js";
import type DiscordBotDB from "../../../discordbot.db.js";

export default class AddFeatureGuildDiscordBotDbCase {
    async add(client: DiscordBotDB.TransactionClient, guild: DiscordBotDB.Guild.Model, feature: Features) {
        return client.guild.update({
            where: { id: guild.id },
            data: {
                features: { ...(guild.features as object), [feature]: true}
            }
        })
    }
}