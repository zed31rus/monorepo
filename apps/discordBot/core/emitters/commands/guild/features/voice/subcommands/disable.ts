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
							'en-US:emitters.commands.guild.features.voice.subcommands.disable.name'
						)
					)
					.setNameLocalization(
						'ru',
						this.libs.localisation.t(
							'ru:emitters.commands.guild.features.voice.subcommands.disable.name'
						)
					)
					.setDescription(
						this.libs.localisation.t(
							'en-US:emitters.commands.guild.features.voice.subcommands.disable.description'
						)
					)
					.setDescriptionLocalization(
						'ru',
						this.libs.localisation.t(
							'ru:emitters.commands.guild.features.voice.subcommands.disable.description'
						)
					)
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
