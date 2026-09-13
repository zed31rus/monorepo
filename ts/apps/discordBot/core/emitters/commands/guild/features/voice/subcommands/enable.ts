import BaseGuildSlashSubcommand from '#core/base/emitters/commands/slash/subcommand/guild.js';
import { MessageFlags } from 'discord.js';

export default class EnableSubcommandVoiceFeatureGuildCommand extends BaseGuildSlashSubcommand {
	build() {
		this.commands.guild.voice
			.createSubcommand((subcommand) =>
				subcommand
					.setName(
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.enable.name',
							{
								lng: 'en-US',
							}
						)
					)
					.setNameLocalization(
						'ru',
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.enable.name',
							{
								lng: 'ru',
							}
						)
					)
					.setDescription(
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.enable.description',
							{
								lng: 'en-US',
							}
						)
					)
					.setDescriptionLocalization(
						'ru',
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.enable.description',
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
				try {
					await this.services.guild.enableFeature(
						interaction.guildId,
						'temporaryVoiceChannels'
					);
				} catch (error) {
					this.logger.error('Failed to enable voice feature', { error });
					await interaction.editReply({
						content: this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.enable.replies.errors.configure',
							{
								lng: interaction.locale,
							}
						),
					});
					return;
				}

				await interaction.editReply({
					content: this.libs.localisation.t(
						'emitters.commands.guild.features.voice.subcommands.enable.replies.success',
						{
							lng: interaction.locale,
						}
					),
				});
			});
	}
}
