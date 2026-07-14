import { DiscordBotDBType } from '../../db.js';

export default class DeleteServerName {
	async delete(
		client: DiscordBotDBType.Prisma.TransactionClient,
		serverName: DiscordBotDBType.Prisma.ServerNameModel
	) {
		await client.serverName.delete({
			where: {
				id: serverName.id,
			},
		});
	}
}
