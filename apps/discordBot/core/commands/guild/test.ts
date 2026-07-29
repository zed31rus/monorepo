import BaseCommand, { type BaseCommandArgs } from '#core/base/commands/base.js';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default class TestCommand extends BaseCommand {
	data = new SlashCommandBuilder().setName('Test').setDescription('testCommand');
	async action(interaction: ChatInputCommandInteraction) {
		interaction.reply('Тест');
	}
	constructor(...baseCommandArgs: BaseCommandArgs) {
		super(...baseCommandArgs);
	}
}
