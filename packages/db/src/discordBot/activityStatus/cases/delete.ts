import type { DiscordBotDBType } from '../../db.js';

export default class DeleteActivityStatus {
	async delete(
		client: DiscordBotDBType.Prisma.TransactionClient,
		activityStatus: DiscordBotDBType.Prisma.ActivityStatusModel
	) {
		await client.activityStatus.delete({
			where: {
				id: activityStatus.id,
			},
		});
	}
}
