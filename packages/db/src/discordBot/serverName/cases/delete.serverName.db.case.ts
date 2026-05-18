import { DiscordBotDBType } from '../../discordbot.db.js';
import type ServerName from '../serverName.db.js';

export default class DeleteServerName {
    async delete(
        client: DiscordBotDBType.TransactionClient,
        serverName: ServerName.ServerNameModel
    ) {
        await client.serverName.delete({
            where: {
                id: serverName.id,
            },
        });
    }
}
