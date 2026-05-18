import type { DiscordBotDBType } from '../../discordbot.db.js';

export default class DeleteGuildDbCase {
    async create(client: DiscordBotDBType.TransactionClient, guild: DiscordBotDBType.GuildModel) {
        return client.guild.delete({
            where: {
                guildId: guild.guildId,
            },
        });
    }
}
