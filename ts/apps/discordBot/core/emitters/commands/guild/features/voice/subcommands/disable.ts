import BaseGuildSlashSubcommand from '#core/base/emitters/commands/slash/subcommand/guild.js';
import { MessageFlags } from 'discord.js';

export default class DisableSubcommandVoiceFeatureGuildCommand extends BaseGuildSlashSubcommand {
	build() {
		this.commands.guild.voice
			.createSubcommand((subcommand) =>
				subcommand
					.setName(
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.disable.name',
							{
								lng: 'en-US',
							}
						)
					)
					.setNameLocalization(
						'ru',
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.disable.name',
							{
								lng: 'ru',
							}
						)
					)
					.setDescription(
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.disable.description',
							{
								lng: 'en-US',
							}
						)
					)
					.setDescriptionLocalization(
						'ru',
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.disable.description',
							{
								lng: 'ru',
							}
						)
					)
			)
			.setAction(async (interaction) => {
				await interaction.deferReply({
					flags: MessageFlags.Ephemeral,
				});
				await this.services.guild.disableFeature(
					interaction.guildId,
					'temporaryVoiceChannels'
				);
				interaction.editReply({
					content: this.libs.localisation.t(
						'emitters.commands.guild.features.voice.subcommands.disable.replies.success',
						{
							lng: interaction.locale,
						}
					),
				});
			});
	}
}
