import BaseGuildSlashCommand, {
	type BaseGuildSlashCommandArgs,
} from '#core/base/commands/slash/guild.js';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default class TestGlobalCommand extends BaseGuildSlashCommand {
	data = new SlashCommandBuilder().setName('Test').setDescription('testCommand');
	async action(interaction: ChatInputCommandInteraction) {
		interaction.reply('Тест');
	}
	constructor(...baseCommandArgs: BaseGuildSlashCommandArgs) {
		super(...baseCommandArgs);
	}
}
