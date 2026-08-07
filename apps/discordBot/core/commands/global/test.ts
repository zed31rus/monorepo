import BaseGlobalCommand, { type BaseGlobalCommandArgs } from '#core/base/commands/global.js';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default class TestGlobalCommand extends BaseGlobalCommand {
	data = new SlashCommandBuilder().setName('Test').setDescription('testCommand');
	async action(interaction: ChatInputCommandInteraction) {
		interaction.reply('Тест');
	}
	constructor(...baseCommandArgs: BaseGlobalCommandArgs) {
		super(...baseCommandArgs);
	}
}
