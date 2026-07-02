import type { DiscordBotDBType } from '../../db.js';

export default class DeleteActivityStatus {
	async delete(
		client: DiscordBotDBType.TransactionClient,
		activityStatus: DiscordBotDBType.ActivityStatusModel
	) {
		await client.activityStatus.delete({
			where: {
				id: activityStatus.id,
			},
		});
	}
}
