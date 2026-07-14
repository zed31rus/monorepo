import { DiscordBotDBType } from '../../db.js';

export default class getActivityStatus {
	async byId(client: DiscordBotDBType.Prisma.TransactionClient, id: number) {
		return await client.activityStatus.findUniqueOrThrow({
			where: { id: id },
		});
	}

	async byName(client: DiscordBotDBType.Prisma.TransactionClient, name: string) {
		return await client.activityStatus.findFirstOrThrow({
			where: {
				name: name,
			},
		});
	}

	async random(client: DiscordBotDBType.Prisma.TransactionClient) {
		const itemsCount = await client.activityStatus.count();
		const skip = Math.floor(Math.random() * itemsCount);
		return await client.activityStatus.findFirst({
			skip: skip,
			take: 1,
		});
	}
}
