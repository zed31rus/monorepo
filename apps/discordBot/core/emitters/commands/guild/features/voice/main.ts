import BaseGuildSlashCommand from '#core/base/emitters/commands/slash/guild.js';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export default class VoiceFeatureGuildCommand extends BaseGuildSlashCommand {
	data = new SlashCommandBuilder()
		.setName('temporary_voice')
		.setNameLocalization('ru', 'временные_каналы')
		.setDescription('Temporary voice managment')
		.setDescriptionLocalization('ru', 'Управление временными голосовыми каналами');
	action(interaction: ChatInputCommandInteraction<'cached'>) {
		interaction.reply(
			'Если ты видишь этот текст значит скорее всего это либо баг либо эта команда ещё в разработке... Сорян !'
		);
	}
}
