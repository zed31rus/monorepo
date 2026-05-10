import DiscordBotDB from "../../discordbot.db.js"

export default class createActivityStatus {

    async create(client: DiscordBotDB.TransactionClient, name: string, type: number) {
        await client.activityStatus.create({
            data: {
                type: type,
                name: name
            }
        })
    }

}