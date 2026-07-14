import { DiscordBotDBType } from '../../db.js';

export default class CreateServerName {
	async create(client: DiscordBotDBType.Prisma.TransactionClient, name: string) {
		await client.serverName.create({
			data: {
				name: name,
			},
		});
	}
}
