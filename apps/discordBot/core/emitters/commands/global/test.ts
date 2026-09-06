import BaseGlobalSlashCommand from '#core/base/emitters/commands/slash/global.js';
import { ChatInputCommandInteraction } from 'discord.js';

export default class TestGlobalSlashCommand extends BaseGlobalSlashCommand {
	init() {
		return this.setData((builder) => builder.setName('Test').setDescription('testCommand'));
	}
	async action(interaction: ChatInputCommandInteraction) {
		interaction.reply('Тест');
	}
}
