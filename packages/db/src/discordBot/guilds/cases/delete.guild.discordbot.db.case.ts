import type DiscordBotDB from "../../discordbot.db.js";

export default class DeleteGuildDbCase {
    async create(client: DiscordBotDB.TransactionClient, guild: DiscordBotDB.Guild.Model) {

        return client.guild.delete({
            where: {
                guildId: guild.guildId
            }
        })

    }
}