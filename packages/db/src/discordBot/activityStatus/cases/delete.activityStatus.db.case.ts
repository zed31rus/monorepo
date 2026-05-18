import type { DiscordBotDBType } from '../../discordbot.db.js';
import ActivityStatusDiscordBotDb from '../activityStatus.discordbot.db.js';

export default class DeleteActivityStatus {
    async delete(
        client: DiscordBotDBType.TransactionClient,
        activityStatus: ActivityStatusDiscordBotDb.ActivityStatusModel
    ) {
        await client.activityStatus.delete({
            where: {
                id: activityStatus.id,
            },
        });
    }
}
