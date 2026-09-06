import BaseGuildSlashCommand from '#core/base/emitters/commands/slash/guild.js';
import { ChatInputCommandInteraction, MessageFlags } from 'discord.js';

export default class VoiceFeatureGuildCommand extends BaseGuildSlashCommand {
	init() {
		return this.setData((builder) => {
			return builder
				.setName(
					this.libs.localisation.t('emitters.commands.guild.features.voice.name', {
						lng: 'ru',
					})
				)
				.setNameLocalization(
					'ru',
					this.libs.localisation.t('emitters.commands.guild.features.voice.name', {
						lng: 'ru',
					})
				)
				.setDescription(
					this.libs.localisation.t('emitters.commands.guild.features.voice.description', {
						lng: 'en-US',
					})
				)
				.setDescriptionLocalization(
					'ru',
					this.libs.localisation.t('emitters.commands.guild.features.voice.description', {
						lng: 'ru',
					})
				);
		});
	}

	action(interaction: ChatInputCommandInteraction<'cached'>) {
		interaction.deferReply({
			flags: [MessageFlags.Ephemeral],
		});
		interaction.editReply({
			message: this.libs.localisation.t(
				'emitters.commands.guild.features.voice.replies.success',
				{
					lng: interaction.locale,
				}
			),
		});
	}
}
