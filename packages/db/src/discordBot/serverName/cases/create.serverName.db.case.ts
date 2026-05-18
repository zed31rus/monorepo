import { DiscordBotDBType } from '../../discordbot.db.js';

export default class CreateServerName {
    async create(client: DiscordBotDBType.TransactionClient, name: string) {
        await client.serverName.create({
            data: {
                name: name,
            },
        });
    }
}
