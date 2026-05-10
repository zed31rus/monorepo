import DiscordBotDB from "../../discordbot.db.js"

export default class CreateServerName {

    async create(client: DiscordBotDB.TransactionClient, name: string) {
        await client.serverName.create({
            data: {
                name: name
            }
        })
    }

}