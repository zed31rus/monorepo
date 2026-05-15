import type DiscordBotDB from "../../discordbot.db.js";

export default class CreateGuildDbCase {
    async create(client: DiscordBotDB.TransactionClient, guildId: string) {

        return client.guild.create({
            data: {
                guildId: guildId,
                features: {}
            }
        })
    }
}