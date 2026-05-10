import type DiscordBotDB from "../../discordbot.db.js"
import ActivityStatus from "../activityStatus.db.js"

export default class DeleteActivityStatus {

    async delete(client: DiscordBotDB.TransactionClient, activityStatus: ActivityStatus.ActivityStatusModel) {
        await client.activityStatus.delete({
            where: {
                id: activityStatus.id
            }
        })
    }

}