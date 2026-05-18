import { DiscordBotDBType } from '../../discordbot.db.js';

export default class createActivityStatus {
    async create(client: DiscordBotDBType.TransactionClient, name: string, type: number) {
        await client.activityStatus.create({
            data: {
                type: type,
                name: name,
            },
        });
    }
}
