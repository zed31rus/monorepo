import type { Features } from "@zed31rus/types/features.discordBot.js"
import type DiscordBotDB from "../../discordbot.db.js"

export default class GetGuildDbCase {
    orNull = {
        async byId(client: DiscordBotDB.TransactionClient, guildId: DiscordBotDB.Guild.Model['guildId']) {
            return client.guild.findUnique({
                where: {
                    guildId: guildId
                }
            })
        },

    }
    
    orThrow = {
        async byId(client: DiscordBotDB.TransactionClient, guildId: DiscordBotDB.Guild.Model['guildId']) {
            return client.guild.findUniqueOrThrow({
                where: {
                    guildId: guildId
                }
            })
        },
    }

    async whereFeature(client: DiscordBotDB.TransactionClient, feature: Features) {
        return client.guild.findMany({
            where: {
                features: { 
                    path: [feature],
                    equals: true
                    }
            }
        })
    }
}