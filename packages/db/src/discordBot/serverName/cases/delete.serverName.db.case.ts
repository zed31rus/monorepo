import { DiscordBotDBType } from '../../discordbot.db.js';

export default class DeleteServerName {
	async delete(
		client: DiscordBotDBType.TransactionClient,
		serverName: DiscordBotDBType.ServerNameModel
	) {
		await client.serverName.delete({
			where: {
				id: serverName.id,
			},
		});
	}
}
