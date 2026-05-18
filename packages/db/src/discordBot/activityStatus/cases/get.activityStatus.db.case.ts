import { DiscordBotDBType } from '../../discordbot.db.js';

export default class getActivityStatus {
    async byId(client: DiscordBotDBType.TransactionClient, id: number) {
        return await client.activityStatus.findUniqueOrThrow({
            where: { id: id },
        });
    }

    async byName(client: DiscordBotDBType.TransactionClient, name: string) {
        return await client.activityStatus.findFirstOrThrow({
            where: {
                name: name,
            },
        });
    }

    async random(client: DiscordBotDBType.TransactionClient) {
        const itemsCount = await client.activityStatus.count();
        const skip = Math.floor(Math.random() * itemsCount);
        return await client.activityStatus.findFirstOrThrow({
            skip: skip,
            take: 1,
        });
    }
}
