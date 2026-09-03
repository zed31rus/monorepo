import BaseGuildSlashSubcommand from '#core/base/emitters/commands/slash/subcommand/guild.js';
import { MessageFlags } from 'discord.js';

export default class DisableSubcommandVoiceFeatureGuildCommand extends BaseGuildSlashSubcommand {
	command = this.commands.guild.voice;
	build() {
		this.command
			.createSubcommand((subcommand) =>
				subcommand
					.setName(
						this.libs.localisation.t(
							'en-US:emitters.commands.guild.features.voice.subcommands.enable.name'
						)
					)
					.setNameLocalization(
						'ru',
						this.libs.localisation.t(
							'ru:emitters.commands.guild.features.voice.subcommands.enable.name'
						)
					)
					.setDescription(
						this.libs.localisation.t(
							'en-US:emitters.commands.guild.features.voice.subcommands.enable.description'
						)
					)
					.setDescriptionLocalization(
						'ru',
						this.libs.localisation.t(
							'ru:emitters.commands.guild.features.voice.subcommands.enable.description'
						)
					)
			)
			.setAction(async (interaction) => {
				interaction.deferReply({
					flags: MessageFlags.Ephemeral,
				});
				const error = await this.services.guild.enableFeature(
					interaction.guildId,
					'temporaryVoiceChannels'
				);

				if (error instanceof this.errors.internal.discord.configure) {
					interaction.editReply({
						message: this.libs.localisation.t(
							'emitters.commands.guild.features.voice.subcommands.enable.replies.errors.configure',
							{
								lng: interaction.locale,
							}
						),
					});
				}

				interaction.editReply({
					message: this.libs.localisation.t(
						'emitters.commands.guild.features.voice.subcommands.disable.replies.success',
						{
							lng: interaction.locale,
						}
					),
				});
			});
	}
}
