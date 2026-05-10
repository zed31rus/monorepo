import DiscordBotDB from "../../discordbot.db.js"; 

export default class getActivityStatus {
    async byId(client: DiscordBotDB.TransactionClient, id: number) {
        return await client.activityStatus.findUniqueOrThrow({
            where: { id: id }
        })
    }

    async byName(client: DiscordBotDB.TransactionClient, name: string) {
        return await client.activityStatus.findFirstOrThrow({
            where: {
                name: name
            }
        })
    }

    async random(client: DiscordBotDB.TransactionClient) {
        const itemsCount = await client.activityStatus.count();
        const skip = Math.floor(Math.random() * itemsCount)
        return await client.activityStatus.findFirstOrThrow({
            skip: skip,
            take: 1
        })
    }
}