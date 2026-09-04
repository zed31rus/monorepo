import { DiscordBotDBType } from '../../db.js';

export default class createActivityStatus {
	async create(
		client: DiscordBotDBType.types.Prisma.TransactionClient,
		name: string,
		type: number
	) {
		await client.activityStatus.create({
			data: {
				type: type,
				name: name,
			},
		});
	}
}
