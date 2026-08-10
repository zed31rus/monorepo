import BaseGlobalSlashCommand, {
	type BaseGlobalSlashCommandArgs,
} from '#core/base/emitters/commands/slash/global.js';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default class TestGlobalSlashCommand extends BaseGlobalSlashCommand {
	data = new SlashCommandBuilder().setName('Test').setDescription('testCommand');
	async action(interaction: ChatInputCommandInteraction) {
		interaction.reply('Тест');
	}
	constructor(...baseGlobalSlashCommandArgs: BaseGlobalSlashCommandArgs) {
		super(...baseGlobalSlashCommandArgs);
	}
}
