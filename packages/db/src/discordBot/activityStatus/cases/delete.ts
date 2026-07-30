import type { DiscordBotDBType } from '../../db.js';

export default class DeleteActivityStatus {
	async delete(
		client: DiscordBotDBType.types.TransactionClient,
		activityStatus: DiscordBotDBType.types.ActivityStatusModel
	) {
		await client.activityStatus.delete({
			where: {
				id: activityStatus.id,
			},
		});
	}
}
