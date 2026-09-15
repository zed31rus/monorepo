import BaseGuildSlashSubcommand from '#core/base/emitters/commands/slash/subcommand/guild.js';
import { MessageFlags } from 'discord.js';

export default class EnableSubcommandVoiceFeatureGuildCommand extends BaseGuildSlashSubcommand {
	build() {
		this.commands.guild.voice
			.createSubcommand((subcommand) =>
				subcommand
					.setName(
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.configure.name',
							{
								lng: 'en-US',
							}
						)
					)
					.setNameLocalization(
						'ru',
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.configure.name',
							{
								lng: 'ru',
							}
						)
					)
					.setDescription(
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.configure.description',
							{
								lng: 'en-US',
							}
						)
					)
					.setDescriptionLocalization(
						'ru',
						this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.configure.description',
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
					const manager = await this.services.guild.getWhereGuildIdFeatureOrThrow(
						interaction.channelId,
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
