import BaseGuildSlashSubcommand from '#core/base/emitters/commands/slash/subcommand/guild.js';
import { MessageFlags } from 'discord.js';

export default class DisableSubcommandVoiceFeatureGuildCommand extends BaseGuildSlashSubcommand {
	command = this.commands.guild.voice;
	build() {
		this.command
			.createSubcommand((subcommand) =>
				subcommand
					.setName('disable')
					.setNameLocalization('ru', 'отключить')
					.setDescription('Disable temporary voice')
					.setDescriptionLocalization('ru', 'Отключить временные голосовые команды')
			)
			.setAction(async (interaction) => {
				interaction.deferReply({
					flags: MessageFlags.Ephemeral,
				});
				await this.services.guild.disableFeature(
					interaction.guildId,
					'temporaryVoiceChannels'
				);
				interaction.editReply({
					message: this.libs.localisation.t(''),
				});
			});
	}
}
