import DiscordBotDB from "../../discordbot.db.js"; 

export default class GetServerName {
    async byId(client: DiscordBotDB.TransactionClient, id: number) {
        return await client.serverName.findUniqueOrThrow({
            where: { id: id }
        })
    }

    async byName(client: DiscordBotDB.TransactionClient, name: string) {
        return await client.serverName.findFirstOrThrow({
            where: {
                name: name
            }
        })
    }

    async random(client: DiscordBotDB.TransactionClient) {
        const itemsCount = await client.serverName.count();
        const skip = Math.floor(Math.random() * itemsCount)
        return await client.serverName.findFirstOrThrow({
            skip: skip,
            take: 1
        })
    }
}