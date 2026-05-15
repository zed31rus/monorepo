import type DiscordBotDB from "../../discordbot.db.js"
import ActivityStatusDiscordBotDb from "../activityStatus.discordbot.db.js"

export default class DeleteActivityStatus {

    async delete(client: DiscordBotDB.TransactionClient, activityStatus: ActivityStatusDiscordBotDb.ActivityStatusModel) {
        await client.activityStatus.delete({
            where: {
                id: activityStatus.id
            }
        })
    }

}