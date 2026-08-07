import BaseGlobalSlashCommand, {
	type BaseGlobalSlashCommandArgs,
} from '#core/base/commands/slash/guild.js';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default class TestGlobalCommand extends BaseGlobalSlashCommand {
	data = new SlashCommandBuilder().setName('Test').setDescription('testCommand');
	async action(interaction: ChatInputCommandInteraction) {
		interaction.reply('Тест');
	}
	constructor(...baseCommandArgs: BaseGlobalSlashCommandArgs) {
		super(...baseCommandArgs);
	}
}
