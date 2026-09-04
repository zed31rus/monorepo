import type { DiscordBotDBType } from '../../db.js';

export default class DeleteActivityStatus {
	async delete(
		client: DiscordBotDBType.types.Prisma.TransactionClient,
		activityStatus: DiscordBotDBType.types.Prisma.ActivityStatusModel
	) {
		await client.activityStatus.delete({
			where: {
				id: activityStatus.id,
			},
		});
	}
}
